<script setup>
import { ref } from "vue";
import { supabase } from "@/clients/supabase";
let email = ref("");
let password = ref("");

const createAccount = async () => {
  console.log("creando cuenta ...");

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
}

const login = async () => {
  console.log("login...")

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }

}

const logout = async () => {
  console.log("logout");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    console.log("Logout has been successful!!!")
  }
}

const seeCurrentUser = async () => {
  console.log("see current user");
  const localUser = await supabase.auth.getUser();
  console.log(localUser)
}

seeCurrentUser();

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
        <button @click="createAccount"> Create </button>
        <button @click="login"> Login </button>
        <button @click="seeCurrentUser"> See user </button>
        <button @click="logout"> Logout </button>
      </div>
    </div>


  </div>
</template>

<style scoped></style>
