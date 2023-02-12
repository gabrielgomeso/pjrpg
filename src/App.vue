<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { TheHeader, TheFooter } from "@/components/layout";
const hide = ref(false);

function hideFooter() {
  hide.value = true;
}

function showFooter() {
  hide.value = false;
}
</script>

<template>
  <main class="main-container">
    <TheHeader />
    <section class="main-container--router-view">
      <RouterView v-slot="{ Component }" mode="out-in">
        <transition
          name="slide"
          @before-enter="hideFooter"
          @after-leave="showFooter"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </section>
    <TheFooter :class="{ hidden: hide }" />
  </main>
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
}

.main-container--router-view {
  flex: 1;
  position: relative;
  min-height: 100vh;
}

.slide-enter-active,
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
}

.hidden {
  display: none;
}
</style>
