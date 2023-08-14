<script setup lang="ts">
import { RouterView } from "vue-router";
import { TheHeader, TheFooter } from "@/components/layout";
</script>

<template>
  <TheHeader />
  <main class="main-container">
    <section>
      <RouterView v-slot="{ Component }" mode="out-in">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </RouterView>
    </section>
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
  grid-template-rows: 1fr auto 50px;
  grid-template-columns: 100%;
}

@media (min-width: 768px) {
  .main-container {
    grid-template-rows: 1fr auto;
  }
}
</style>
