<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/clients/supabase";

let task = ref("");
let tasks = ref([]);
const user = ref(null);


onMounted(async () => {
  // Como ya el usuario está logado, sino no podría estar en esta página
  // Cojo la sesion y guardo el usuario
  const { data: { session } } = await supabase.auth.getSession();
  user.value = session?.user ?? null;

  if (user.value) {
    // (Opcional) carga inicial de tareas de este usuario
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.value.id)
      .order("inserted_at", { ascending: false });

    if (!error) tasks.value = data;
  }
});


const addTask = async () => {
  console.log("Adding task ... " + task.value)

  const title = task.value.trim();

  if (!user.value) {
    console.warn("User  is not logado");
    return;
  }

  const { data, error } = await supabase
    .from("todos")
    .insert([{
      task: title,
      is_complete: false,
      user_id: user.value.id
    }])
    .select(); // para recuperar el registro con id y timestamps

  if (error) {
    console.error("Error añadiendo tarea:", error);
  } else {
    tasks.value.unshift(data[0]);
    task.value = "";
  }
};
</script>

<template>
  <div>
    <h1>WELCOME TO TODO APP</h1>

    <div class="inputContainer">
      <label for="task"> Task: </label>
      <input type="text" id="task" v-model="task">

      <button @click="addTask"> Add Task </button>
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
              <button @click="deleteContact(contact.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>