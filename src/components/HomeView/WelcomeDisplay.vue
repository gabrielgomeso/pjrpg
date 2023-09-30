<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="welcome-display__container">
    <h1 class="form-label__text">Olá, aventureito!</h1>
    <p class="form-label__text">
      Acesse seu perfil para modificar suas informações, criar seu personagem e
      iniciar sua jornada.
    </p>
    <RouterLink class="welcome-display__profile-link" to="/my-profile">
      Meu perfil ➡️
    </RouterLink>
  </div>
</template>
<style>
.welcome-display__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 450px;
  padding: 1rem;
  border-radius: 15px;
  background-color: #272727;
}

.welcome-display__profile-link {
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: #4d4d4d;
  color: white;
  text-align: center;
  text-decoration: none;
}
</style>
