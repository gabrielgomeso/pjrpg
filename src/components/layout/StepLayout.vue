<script setup lang="ts">
defineProps<{
  stepTitle: string;
}>();
</script>

<template>
  <main class="step-layout--main">
    <h2 class="step">{{ stepTitle }}</h2>
    <slot></slot>
  </main>
</template>

<style>
.step-layout--main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
