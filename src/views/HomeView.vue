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
  <main>
    <div class="main-page__first-fold">
      <h1 class="main-page__first-fold--title">Herdeiros do Olímpo</h1>
      <h2 class="main-page__first-fold--subtitle">
        RPG de Mesa baseado na obra <span>Percy Jackson e os Olimpianos</span>
      </h2>
      <div class="main-page__first-fold--action-buttons">
        <button class="main-page__first-fold--login-button">Fazer login</button>
        <button class="main-page__first-fold--register-button">Registrar-se</button>
        <button class="main-page__first-fold--about-button">Saber mais</button>
      </div>
    </div>
  </main>
  <!-- <main class="home-main">
    <div v-if="loggedUser == undefined" class="auth-container">
      <div>
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
      <div>
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

        <button type="button" @click="register(email, password)">
          Register
        </button>
      </div>
    </div>
    <div v-if="loggedUser != undefined">
      <button type="button" @click="logout()">logout</button>
    </div>
  </main> -->
</template>
<style>
.main-page__first-fold {
  align-items: center;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 1rem;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: url("../assets/images/first-fold.jpg") no-repeat center / cover;
}

.main-page__first-fold--title {
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  grid-row: 4 / 5;
  font-size: clamp(2rem, 5vw, 5rem);
  color: white;
  text-shadow: 0 0 10px black;
  animation: fade-in 1s ease-out forwards;
}

.main-page__first-fold--subtitle {
  grid-row: 5 / 6;
  font-size: clamp(1.5rem, 1vw, 3rem);
  align-self: flex-start;
  text-shadow: 0 0 10px rgb(36, 35, 35);
  animation: fade-in 1.5s ease-out forwards;
}

.main-page__first-fold--action-buttons {
  grid-row: 6 / 7;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-page__first-fold--login-button {
  animation: fade-in 2s ease-in-out forwards;
}

.main-page__first-fold--register-button {
  animation: fade-in 2.5s ease-in-out forwards;
}

.main-page__first-fold--about-button {
  animation: fade-in 3s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-container {
  display: flex;
  flex-direction: column;
}
</style>
