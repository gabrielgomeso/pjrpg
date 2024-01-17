<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useAuthStore());
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
  <nav class="navigation-desktop">
    <figure>
      <img
        src="../../../assets/logo.png"
        alt="Percy Jackson and the Olympians logo"
        width="75"
        height="75"
      />
    </figure>
    <RouterLink class="navigation-link" to="/">Início</RouterLink>
    <RouterLink class="navigation-link" to="/roll_dice">Rolar dados</RouterLink>
    <RouterLink v-show="isLoggedIn" class="navigation-link" to="/my-profile">
      Meu perfil
    </RouterLink>
    <RouterLink class="navigation-link" to="/timeline">
      Linha do tempo
    </RouterLink>
    <RouterLink class="navigation-link" to="/about">Sobre</RouterLink>
    <button
      class="navigation-desktop__logout-button"
      v-if="isLoggedIn"
      @click="handleLogout()"
    >
      Sair
    </button>
  </nav>
</template>

<style>
.navigation-desktop {
  display: none;
}

.navigation-desktop__logout-button {
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;
  padding: 0.25rem;
}

@media (min-width: 768px) {
  .navigation-desktop {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    background-color: var(--vt-c-black-mute);
    width: 100%;
    padding: 0.5rem;
    max-height: 100px;
  }
}
</style>
