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
  <div class="login-container">

    <div class="header">
      <h1 class="login-title">Login</h1>
    </div>


    <div class="login-form">
      <div class="login-inputs">
        <input type="email" id="email" placeholder="Email" v-model="email">
        <input type="password" id="password" placeholder="Password" v-model="password">
      </div>

      <div class="login-buttons">
        <button @click="handleLogin" class="login-btn"> Log in </button>
        <button @click="handleCreate" class="signup-btn"> Sign up </button>

      </div>

      <div v-if="auth.loading" class="error-loading">Procesando...</div>

      <div v-if="auth.user">
        <p>Usuario actual: {{ auth.user.email }}</p>
      </div>

      <div v-if="auth.error" style="color: red">
        {{ auth.error }}
      </div>

    </div>


  </div>
</template>

<style>
.login-container {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.login-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: #555460;
}

.login-form {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
}

.login-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

input {
  margin: 1rem 0 1rem;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;

}

.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #73B5BD;
  color: white;
  cursor: pointer;
  font-weight: 300;
}

button.signup-btn {
  background-color: #FFD6C0;
  color: #968A83;
  font-weight: 500;
}

button:hover {
  opacity: 0.9;
}

.error {
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
  text-align: center;
}

.header {
  background-color: #E0D2FE;
  padding: 2rem 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: #555561;
}
</style>
