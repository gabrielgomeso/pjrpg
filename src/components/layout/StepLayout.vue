<script setup lang="ts">
defineProps<{
  stepTitle: string;
}>();
</script>

<template>
  <main>
    <h2 class="step-layout--title">{{ stepTitle }}</h2>
    <slot></slot>
  </main>
</template>

<style>
.step-layout--title {
  width: 100%;
  text-align: center;
}
</style>
