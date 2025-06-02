<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const todoCount = computed(() => props.tasks.filter(t => !t.is_complete).length);
const doneCount = computed(() => props.tasks.filter(t => t.is_complete).length);

</script>

<template>

  <div class="summary">
    <h3>Summary</h3>
    <ul>
      <li>Todo: {{ todoCount }}</li>
      <li>Done: {{ doneCount }}</li>
    </ul>
  </div>

</template>


<style scoped>
.summary {
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-family: sans-serif;
  color: #555561;
  min-width: 150px;
  margin-right: 1rem;
}

.summary h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #555561;
}

.summary ul {
  list-style-type: disc;
  padding-left: 1.2rem;
}

.summary li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
</style>
