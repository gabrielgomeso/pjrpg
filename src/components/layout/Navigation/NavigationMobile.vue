<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const isOpen = ref(false);

async function handleLogout() {
  try {
    await logout();
  } catch (error) {
    console.log("Error while loggin out", error);
  }
}
</script>

<template>
  <nav class="navigation-mobile">
    <div v-if="isOpen" class="navigation-links">
      <button @click="isOpen = !isOpen" class="navigation-mobile__close-button">
        X
      </button>
      <figure>
        <img
          class="navigation-logo"
          src="../../../assets/logo.png"
          alt="Percy Jackson and the Olympians logo"
          height="75"
        />
      </figure>
      <RouterLink @click="isOpen = !isOpen" class="navigation-link" to="/">
        Início
      </RouterLink>
      <RouterLink
        @click="isOpen = !isOpen"
        class="navigation-link"
        to="/roll_dice"
      >
        Rolar dados
      </RouterLink>
      <RouterLink
        @click="isOpen = !isOpen"
        v-show="isLoggedIn"
        class="navigation-link"
        to="/my-profile"
      >
        Meu perfil
      </RouterLink>
      <RouterLink @click="isOpen = !isOpen" class="navigation-link" to="/about">
        Sobre
      </RouterLink>
      <button
        v-if="isLoggedIn"
        @click="handleLogout()"
        class="navigation-mobile__logout-button"
      >
        Sair
      </button>
    </div>
    <button
      @click="isOpen = !isOpen"
      class="navigation-mobile__menu-button navigation-link"
    >
      Menu
    </button>
  </nav>
</template>

<style>
.navigation-mobile {
  display: flex;
  background-color: var(--vt-c-black-mute);
  justify-content: flex-end;
  padding: 15px;
  overflow: hidden;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  background-color: var(--vt-c-black-mute);
  width: 100%;
  padding: 1rem;
  max-height: 100px;
}

.navigation-links {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  font-size: 1.5em;
  background-color: var(--vt-c-black-mute);
  padding: 1rem;
  overflow: hidden;
}

.navigation-logo {
  display: none;
}

.navigation-mobile__menu-button {
  display: block;
  background-color: transparent;
  font-size: 1rem;
  border: none;
  color: white;
}

.navigation-mobile__close-button {
  position: absolute;
  top: 0;
  right: 1rem;
  display: block;
  background-color: transparent;
  font-size: 1.5rem;
  border: none;
  color: white;
  cursor: pointer;
}

.navigation a {
  border: 1px solid white;
}

.navigation-link {
  text-decoration: none;
  color: rgb(218, 143, 4);
  font-weight: 900;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;
  transition: transform 0.2s ease-in-out;
  text-align: center;
  padding: 0.25rem;
}

.navigation-link:hover {
  transform: scale(1.1);
}

.navigation-mobile__logout-button {
  padding: 8px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  width: 100%;
}

@media (min-width: 768px) {
  .navigation-logo {
    display: block;
  }

  .navigation-mobile__close-button {
    display: none;
  }

  .navigation-mobile {
    display: none;
  }
}
</style>
