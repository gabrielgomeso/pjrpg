<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/character_creation">Character Creation</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView class="main" />
</template>

<style>
.main {
  width: 100vw;
  height: var(--full-height);
}
</style>
