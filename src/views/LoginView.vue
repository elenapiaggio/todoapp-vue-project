<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

let email = ref("");
let password = ref("");


const handleCreate = async () => {
  await auth.createAccount(email.value, password.value);
};

const handleLogin = async () => {
  await auth.login(email.value, password.value);
  router.push('/tasks')
}

const handleLogout = async () => {
  await auth.logout();
}

const handleSeeUser = async () => {
  await auth.loadCurrentUser();
  console.log("Actual user: ", auth.user);
}

</script>

<template>
  <div class="hola">
    <h1>LOGIN</h1>


    <div>
      <div class="inputContainer">
        <label for="email"> Email: </label>
        <input type="email" id="email" v-model="email">
      </div>

      <div class="inputContainer">
        <label for="email"> Password: </label>
        <input type="password" id="password" v-model="password">
      </div>

      <div class="buttonContainer">
        <button @click="handleCreate"> Sign up </button>
        <button @click="handleLogin"> Log in </button>
        
      </div>

      <div v-if="auth.loading">Procesando...</div>

      <div v-if="auth.user">
        <p>Usuario actual: {{ auth.user.email }}</p>
      </div>

      <div v-if="auth.error" style="color: red">
        {{ auth.error }}
      </div>

    </div>


  </div>
</template>

<style scoped></style>
