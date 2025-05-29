<script setup>
</script>

<template>
  <div class="header">
    <p class="login-title">TodoApp ✏️</p>
    <slot /> 
  </div>
</template>



<style scoped>
.header {
  background-color: #E0D2FE;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.login-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  color: #555561;
}
</style>
