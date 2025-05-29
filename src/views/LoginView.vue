<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

import Header from "@/components/Header.vue";
import DemoList from "@/components/DemoList.vue";

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

    <Header />

    <div class="login-welcome-title">
      <h1> Convierte cada <span class="tachado">todo</span> <br />en un <span class="hecho">done</span>
      </h1>
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

      <DemoList class="demo-list-desktop" />
    </div>



  </div>
</template>

<style scoped>
.login-container {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.login-welcome-title {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.login-form {
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
}

.login-inputs {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
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
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}



.tachado {
  text-decoration: line-through;
  color: #888;
}

.hecho {
  font-weight: bold;
  color: #73B5BD;
}

.demo-list-desktop {
  display: none;
}

@media (min-width: 768px) {
  .demo-list-desktop {
    display: block;
  }

  .login-welcome-title {
    margin-top: 6rem;
    margin-bottom: 4rem;
  }
}
</style>
