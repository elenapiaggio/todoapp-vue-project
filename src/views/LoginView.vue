<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

import todoappImg from '@/assets/images/todoapp.png';

import Header from "@/components/Header.vue";

const router = useRouter();
const auth = useAuthStore();

const emailError = ref("");
const passwordError = ref("");

const loginError = ref("");
const successMessage = ref("");



let email = ref("");
let password = ref("");


const handleCreate = async () => {
  emailError.value = "";
  passwordError.value = "";
  loginError.value = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=(?:.*[a-zA-Z]){4,})(?=.*\d).+$/;

  let hasError = false;

  if (!emailRegex.test(email.value)) {
    emailError.value = "Por favor, introduce un email válido.";
    hasError = true;
  }

  if (!passwordRegex.test(password.value)) {
    passwordError.value = "La contraseña debe tener al menos 4 letras y 1 número.";
    hasError = true;
  }

  if (hasError) return;

  try {
    await auth.createAccount(email.value, password.value);
    successMessage.value = "Cuenta creada correctamente.";

    // Espera 2 segundos para que se vea el mensaje
    setTimeout(() => {
      successMessage.value = "";
      router.push('/tasks');
    }, 5000); 
  } catch (e) {
    if (e.message.includes("already")) {
      loginError.value = "Este email ya está registrado.";
    } else {
      loginError.value = "Error al crear la cuenta. Inténtalo de nuevo.";
    }
    console.error("Error al crear cuenta:", e);
  }


};



const handleLogin = async () => {

  emailError.value = "";
  passwordError.value = "";

  loginError.value = "";


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = "Por favor, introduce un email válido.";
    return;
  }

  const passwordRegex = /^(?=(?:.*[a-zA-Z]){4,})(?=.*\d).+$/;
  if (!passwordRegex.test(password.value)) {
    passwordError.value = "La contraseña debe tener al menos 4 letras y 1 número.";
    return;
  }

  try {
    await auth.login(email.value, password.value);
    router.push('/tasks');
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      loginError.value = "El usuario no existe.";
    } else if (e.code === 'auth/wrong-password') {
      loginError.value = "Contraseña incorrecta.";
    } else {
      loginError.value = "Error al iniciar sesión.";
    }
  }

};

</script>

<template>
  <div class="login-container">

    <Header />

    <div class="login-welcome-title">
      <h1> Convierte cada <span class="tachado">todo</span> <br />en un <span class="hecho">done</span>
      </h1>
    </div>

    <div class="login-form">
      <div>
        <img class="demo-list-desktop" :src="todoappImg" alt="TodoApp logo" />
      </div>
      <div class="login-inputs">
        <div v-if="successMessage" class="success">{{ successMessage }}</div>

        <div v-if="emailError" class="error">{{ emailError }}</div>
        <input type="email" id="email" placeholder="Email" v-model="email">

        <div v-if="passwordError" class="error">{{ passwordError }}</div>
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

.success {
  margin-top: 1rem;
  color: green;
  font-size: 0.95rem;
  text-align: center;
  background-color: #e0f8e9;
  border: 1px solid #b5e2c4;
  padding: 0.5rem;
  border-radius: 6px;
}


@media (min-width: 768px) {
  .demo-list-desktop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    margin-top: 1rem;
  }



  .login-welcome-title {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1.5rem;
  }

  .login-inputs {
    display: flex;
    flex-direction: column;
  }

  input {
    margin: 0rem 0 1rem;
  }

  .login-form {
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .login-inputs {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
