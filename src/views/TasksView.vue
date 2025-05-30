<script setup>
import { ref, onMounted } from "vue";

import { useTasksStore } from "@/stores/task.store";
import { useAuthStore } from '@/stores/auth.store';

import Header from "@/components/Header.vue";


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
    console.error("Error deleting task: ", e);
  }
};
const handleToggleComplete = async (task) => {
  console.log("check clicado");
  try {
    await tasksStore.updateTaskStatus(task.id, task.is_complete)
  } catch (e) {
    console.log("Error updating task: " + e)
  }
}
</script>

<template>
  <div class="tasks-container">

    <Header>
      <a href="#" class="logout-link" @click.prevent="auth.logout()">Log out</a>

    </Header>

    <div class="tasks-content">
      <div class="task-form">
        <input type="text" id="task" v-model="task" placeholder="Add new task ...">
        <button @click="handleAddTask" class="btn-addtask"> Add Task </button>
      </div>

      <div class="task-list">
        <ul class="tasks">
          <li class="task-item" v-for="task in tasksStore.tasks" :key="task.id">
            <label class="task-info">
              <input class="task-checkbox-input" type="checkbox" :checked="task.is_complete"
                @change="() => handleToggleComplete(task)" />
              <span :class="{ completed: task.is_complete }">{{ task.task }}</span>
            </label>

            <button class="delete-btn" @click="() => handleDeleteTask(task.id)">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<style scoped>
.tasks-container {
  margin: 0 auto;
}

.tasks-content {
  width: 90%;
  margin: 0 auto;
}

.tasks-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.task-form {
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0 auto;
  margin-top: 1rem;

}

.task-form input,
.task-form .btn-addtask {
  width: 100%;
}

.task-form input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.task-form button {
  cursor: pointer;
}

.task-form button:hover {
  opacity: 0.9;
}

.task-list {
  margin-top: 1rem;
}

.task-list-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.tasks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.task-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;

}

.task-info span {
  font-size: 1rem;
}

.task-info .completed {
  text-decoration: line-through;
  color: #aaa;
}

.task-checkbox-input {
  width: 20px;
  height: 20px;
  accent-color: #73B5BD;
  cursor: pointer;
  border-radius: 25px;
  color: white;
}

.delete-btn {
  background-color: #FFD7C0;
  color: #877E79;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #e57373;
  color: white;
}

.logout-link {
  color: #555561;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.logout-link:hover {
  text-decoration: underline;
}

.btn-addtask {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #73B5BD;
  color: white;
  cursor: pointer;
  font-weight: 500;
}


@media (min-width: 768px) {
  .task-form {
    width: 80%;
    max-width: 500px;
    display: flex;
    margin: 0 auto;
    margin-top: 2rem;
  }
}

@media (min-width: 1024px) {
  .task-form {
    width: 80%;
    max-width: 500px;
  }
}
</style>
