<script setup lang="ts">
const props = defineProps<{
  dieSides: Number;
}>();
</script>

<template>
  <button type="button">Roll D{{ props.dieSides }}</button>
</template>

<style></style>
