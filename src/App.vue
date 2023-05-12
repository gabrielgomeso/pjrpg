<script setup lang="ts">
import { RouterView } from "vue-router";
import { TheHeader, TheFooter } from "@/components/layout";
</script>

<template>
  <main class="main-container">
    <section>
      <RouterView v-slot="{ Component }" mode="out-in">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </RouterView>
    </section>
    <TheHeader />
    <!-- <TheFooter /> -->
  </main>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

.main-container {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
}

/* .slide-enter-active,
.slide-leave-active {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  top: 0;
  transform: translateX(30%);
} */
</style>
