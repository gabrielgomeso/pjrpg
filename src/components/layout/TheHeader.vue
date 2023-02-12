<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <header>
    <nav class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/character_creation">Character Creation</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>
<style>
.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-height: var(--navigation-size);
}
</style>
