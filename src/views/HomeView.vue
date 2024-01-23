<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import AuthForm from "../components/utils/AuthForm.vue";
import WelcomeDisplay from "../components/HomeView/WelcomeDisplay.vue";

const { isLoggedIn } = useAuth();
</script>

<template>
  <main class="home-view">
    <header>
      <h1 class="home-view__title">PERCY JACKSON RPG</h1>
      <p class="home-view__subtitle">
        Aventure-se em um mundo tomado por deuses mitológicos, conquiste a
        glória e se torne um ícone eterno.
      </p>
    </header>
    <div class="home-view__auth">
      <AuthForm v-if="!isLoggedIn" />
      <WelcomeDisplay v-else />
    </div>
  </main>
</template>
<style>
.home-view {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url("../assets/images/first-fold.webp") no-repeat top / cover;
  align-items: center;
}

.home-view__title,
.home-view__subtitle {
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  color: white;
  text-align: center;
  text-shadow: 0 0 10px black;
}

.home-view__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.home-view__subtitle {
  font-size: 0.75rem;
  margin-block-end: 1rem;
  max-width: 650px;
  margin: 0.5rem auto;
  text-align: left;
}

.home-view__auth {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

@media (min-width: 768px) {
  .home-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
}
</style>
