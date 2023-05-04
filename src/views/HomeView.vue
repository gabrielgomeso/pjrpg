<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { getUser, register, login, logout } = useAuthStore();
const { loggedUser } = storeToRefs(useAuthStore());

const email = ref("");
const email_confirmation = ref("");
const password = ref("");

onBeforeMount(() => {
  if (loggedUser.value == undefined) {
    getUser();
  }
});
</script>

<template>
  <main class="home-main">
    <div>Welcome, creature.</div>
    <div v-if="loggedUser == undefined" class="register-container">
      <h2>Register</h2>
      <label for="email">
        E-mail:
        <input v-model="email" type="email" name="email" id="email" />
      </label>
      <label for="email_confirmation">
        E-mail confirmation:
        <input
          v-model="email_confirmation"
          type="email"
          name="email_confirmation"
          id="email_confirmation"
        />
      </label>
      <label for="password">
        Password:
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </label>

      <button type="button" @click="register(email, password)">Register</button>
    </div>
    <div v-if="loggedUser == undefined" class="register-container">
      <h2>Login</h2>
      <label for="email">
        E-mail:
        <input v-model="email" type="email" name="email" id="email" />
      </label>
      <label for="password">
        Password:
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </label>

      <button type="button" @click="login(email, password)">Login</button>
    </div>

    <div v-if="loggedUser != undefined" class="register-container">
      <button type="button" @click="logout()">logout</button>
    </div>
  </main>
</template>
<style>
.home-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  height: 100%;
}

.auth-container {
  display: flex;
  flex-direction: column;
}
</style>
