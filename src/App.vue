<script setup lang="ts">
import { RouterView } from "vue-router";
import { TheFooter } from "@/components/layout";
</script>

<template>
  <div class="main-container">
    <main class="main-content">
      <RouterView v-slot="{ Component }" mode="out-in">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  grid-template-rows: 1fr auto 50px;
  grid-template-columns: 100%;
  height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
