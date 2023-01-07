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

  <RouterView />
</template>

<style></style>
