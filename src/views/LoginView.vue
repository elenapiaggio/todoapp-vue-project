<script setup>
import { ref, onMounted } from "vue";
import { createAccount, login, logout, getCurrentUser } from "@/services/auth.service";

let email = ref("");
let password = ref("");

// al montar este componente llamo a seeCurrentUser
onMounted(async () => {
  try {
    const user = await getCurrentUser();
    console.log("User logado:", user)
  } catch (e) {
    console.log(e);
  }
});

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
        <button @click="() => createAccount(email, password)"> Create </button>
        <button @click="() => login(email, password)"> Login </button>
        <button @click="() => getCurrentUser().then(console.log).catch(console.error)"> See user </button>
        <button @click="() => logout().then(() => console.log('Logout successful!!!')).catch(console.error)"> Logout
        </button>
      </div>
    </div>


  </div>
</template>

<style scoped></style>
