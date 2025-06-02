<script setup>
defineProps({
  title: String,
  tasks: Array,
  handleDeleteTask: Function,
  handleToggleComplete: Function
});
</script>

<template>
  <div class="task-list">
    <h3>{{ title }}</h3>
    <ul class="tasks">
      <li class="task-item" v-for="task in tasks" :key="task.id">
        <label class="task-info">
          <input
            class="task-checkbox-input"
            type="checkbox"
            :checked="task.is_complete"
            @change="() => handleToggleComplete(task)"
          />
          <span :class="{ completed: task.is_complete }">{{ task.task }}</span>
        </label>
        <button class="delete-btn" @click="() => handleDeleteTask(task.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 1rem;
}

.task-list h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
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
</style>
