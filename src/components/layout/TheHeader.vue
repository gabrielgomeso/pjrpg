<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <header>
    <nav class="navigation">
      <figure>
        <img
          class="navigation-logo"
          src="../../assets/logo.png"
          alt="Percy Jackson and the Olympians logo"
        />
      </figure>
      <RouterLink class="navigation-link" to="/">Home</RouterLink>
      <RouterLink class="navigation-link" to="/character_creation">
        Character Creation
      </RouterLink>
      <RouterLink class="navigation-link" to="/character">
        Find Character
      </RouterLink>
      <RouterLink class="navigation-link" to="/about">About</RouterLink>
    </nav>
  </header>
</template>
<style>
.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* height: auto; */
  background-color: var(--vt-c-black-mute);
  border-bottom: 1px solid var(--color-border);
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
  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    /* height: var(--navigation-size); */
    background-color: var(--vt-c-black-mute);
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
