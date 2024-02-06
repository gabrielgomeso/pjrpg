<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { logout } = useAuthStore();

async function handleLogout() {
  try {
    await logout();
  } catch (error) {
    console.log("Error while loggin out", error);
  }
}
</script>
<template>
  <div class="welcome-display__container">
    <h1 class="form-label__text">Olá, aventureito!</h1>
    <p class="form-label__text">
      Acesse seu perfil para modificar suas informações, criar seu personagem e
      iniciar sua jornada.
    </p>

    <div class="welcome-display__container-actions">

      
      <RouterLink class="welcome-display__profile-link" to="/my-profile">
        Meu perfil ➡️
      </RouterLink>
      <button
        class="navigation-desktop__logout-button"
        @click="handleLogout()"
      >
        Sair 🚪
      </button>
    </div>
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

.welcome-display__container-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;

}
</style>
