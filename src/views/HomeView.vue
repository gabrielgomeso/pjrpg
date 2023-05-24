<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { getUser } = useAuthStore();
const { loggedUser } = storeToRefs(useAuthStore());

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
        <button class="main-page__first-fold--login-button">
          <a href="/auth/login">Fazer login</a>
        </button>
        <button class="main-page__first-fold--register-button">
          <a href="/auth/register">Registrar-se</a>
        </button>
        <button class="main-page__first-fold--about-button">Saber mais</button>
      </div>
    </div>
    <div class="main-page__second-fold">
      <h3>Aventure-se pelo mundo mitológico</h3>
      <h4>
        Semideus, espírito da natureza, monstro... Escolha sua herança e
        conquiste a glória eterna.
      </h4>
    </div>
  </main>
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url("../assets/images/first-fold.jpg") no-repeat center / cover;
}

.main-page__second-fold {
  align-items: center;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
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
