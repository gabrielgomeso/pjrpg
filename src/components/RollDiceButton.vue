<script setup lang="ts">
const props = defineProps<{
  diceSides: Number;
}>();
</script>

<template>
  <button type="button">Roll D{{ props.diceSides }}</button>
</template>

<style></style>
