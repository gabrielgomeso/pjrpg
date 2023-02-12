<script setup lang="ts">
import { RouterView } from "vue-router";
import { TheHeader, TheFooter } from "@/components/layout";
</script>

<template>
  <TheHeader />

  <RouterView v-slot="{ Component }" class="main" mode="out-in">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </RouterView>

  <TheFooter />
</template>

<style>
.main {
  min-height: 100vh;
}

.slide-enter-active,
.slide-leave-active {
  display: block;
  position: absolute;
  top: var(--navigation-size);
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  top: var(--navigation-size);
  transform: translateX(30%);
}
</style>
