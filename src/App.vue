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

  <RouterView v-slot="{ Component }" mode="out-in" class="main">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>
.main {
  width: 100vw;
  height: var(--full-height);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
