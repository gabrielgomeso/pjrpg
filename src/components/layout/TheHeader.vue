<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";

const openMenu = ref(false);
</script>
<template>
  <header>
    <button
      v-if="!openMenu"
      class="navigation-open-button"
      @click="openMenu = true"
    >
      >>> Open Menu
    </button>
    <nav class="navigation" :class="{ open: openMenu, closed: !openMenu }">
      <span class="navigation-close-button" @click="openMenu = false">
        X Close Menu
      </span>
      <figure>
        <img
          class="navigation-logo"
          src="../../assets/logo.png"
          alt="Percy Jackson and the Olympians logo"
        />
      </figure>
      <RouterLink @click="openMenu = false" class="navigation-link" to="/"
        >Home</RouterLink
      >
      <RouterLink
        @click="openMenu = false"
        class="navigation-link"
        to="/character_creation"
      >
        Character Creation
      </RouterLink>
      <RouterLink
        @click="openMenu = false"
        class="navigation-link"
        to="/roll_dice"
      >
        Roll Dice
      </RouterLink>
      <RouterLink
        @click="openMenu = false"
        class="navigation-link"
        to="/character"
      >
        Find Character
      </RouterLink>
      <RouterLink @click="openMenu = false" class="navigation-link" to="/about"
        >About</RouterLink
      >
    </nav>
  </header>
</template>
<style>
.navigation {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* height: auto; */
  background-color: var(--vt-c-black-mute);
  border-bottom: 1px solid var(--color-border);
  height: 100vh;
  z-index: 1000;
}

.navigation-open-button {
  position: fixed;
  top: 10px;
  left: 20px;
  cursor: pointer;
  z-index: 10000;
}

.navigation-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.closed {
  display: none;
}

.open {
  display: flex;
}

.navigation a:not(:last-child) {
  border-bottom: 1px solid white;
}

.navigation-logo {
  max-height: 150px;
}

.navigation-link {
  text-decoration: none;
  color: rgb(218, 143, 4);
  font-weight: 900;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  text-align: center;
  padding: 1rem;
}

.navigation-link:hover {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .navigation-open-button,
  .navigation-close-button {
    display: none;
  }

  .navigation {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    /* height: var(--navigation-size); */
    background-color: var(--vt-c-black-mute);
    height: auto;
  }

  .navigation-logo {
    height: 100px;
  }

  .navigation-link {
    width: auto;
  }

  .navigation a:not(:last-child) {
    border: 0;
  }
}
</style>
