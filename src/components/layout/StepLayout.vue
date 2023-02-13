<script setup lang="ts">
defineProps<{
  stepTitle: string;
}>();
</script>

<template>
  <section>
    <h2 class="step-layout--title">{{ stepTitle }}</h2>
    <slot></slot>
  </section>
</template>

<style></style>
