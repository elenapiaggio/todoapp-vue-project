<script setup>


</script>

<template>
  <div class="task-form">
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Add new task ..." />
    <button @click="onAddTask" class="btn-addtask">Add Task</button>
  </div>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.task-form input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
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

.btn-addtask:hover {
  opacity: 0.9;
}
</style>
