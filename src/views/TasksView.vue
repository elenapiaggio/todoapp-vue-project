<script setup>
import { ref, onMounted } from "vue";
import { getTasks, addTask, deleteTask } from "@/services/task.service";
import { getCurrentUser } from "@/services/auth.service";


const task = ref("");
const tasks = ref([]);
const user = ref(null);


onMounted(async () => {
  try {
    // Obtengo la sesión del usuario actual si hay alguno logado
    user.value = await getCurrentUser();

    // Si tengo un usuario logado, cargo sus tareas desde el service de tasks
    if (user.value) {
      tasks.value = await getTasks(user.value.id)
    }
  } catch (e) { console.log("Error " + e) }

});


const handleAddTask = async () => {
  if (!user.value) {
    console.warn("User is not logged in");
    return;
  }

  try {
    const newTask = await addTask(task.value, user.value.id);
    tasks.value.unshift(newTask);
    task.value = "";
  } catch (e) {
    console.log("Error adding task ", e)
  }
};


const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id);
    tasks.value = tasks.value.filter((t) => t.id !== id);
  } catch (e) {
    console.error("Error deleting task:", e);
  }
};
</script>

<template>
  <div>
    <h1>WELCOME TO TODO APP</h1>

    <div class="inputContainer">
      <label for="task"> Task: </label>
      <input type="text" id="task" v-model="task">

      <button @click="handleAddTask"> Add Task </button>
    </div>

    <div>
      <h3>Tasks list</h3>
      <table>
        <thead>
          <tr>
            <th>Task description</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.task }}</td>
            <td>{{ task.is_complete }}</td>
            <td>
              <button @click="() => handleDeleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>