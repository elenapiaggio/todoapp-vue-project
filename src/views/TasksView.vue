<script setup>
import { ref, onMounted } from "vue";

import { useTasksStore } from "@/stores/task.store";
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore()
const tasksStore = useTasksStore();
const task = ref("");

onMounted(async () => {
  tasksStore.loadUserAndTasks();

});

const handleAddTask = async () => {
  try {
    await tasksStore.addTask(task.value);
    task.value = "";
  } catch (e) {
    console.error("Error adding task:", e);
  }
};

const handleDeleteTask = async (id) => {
  try {
    await tasksStore.deleteTask(id);
  } catch (e) {
    console.error("Error deleting task:", e);
  }
};
</script>

<template>
  <div>

    <div>
      <button @click="auth.logout()">Logout</button>
    </div>

    <h1>WELCOME TO TODO APP</h1>
    <div v-if="tasksStore.loading">Loading tasks...</div>
    <div v-if="tasksStore.error" style="color: red;">{{ tasksStore.error }}</div>
    <div v-if="tasksStore.user">
      <p>Usuario: {{ tasksStore.user.email }}</p>
    </div>


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
          <tr v-for="task in tasksStore.tasks" :key="task.id">
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