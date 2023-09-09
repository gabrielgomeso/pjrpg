<script setup lang="ts">
const props = defineProps<{
  dieSides: Number;
}>();
</script>

<template>
  <button type="button">Rolar D{{ props.dieSides }}</button>
</template>

<style></style>
