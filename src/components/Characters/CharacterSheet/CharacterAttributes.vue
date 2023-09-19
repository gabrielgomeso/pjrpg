<script lang="ts" setup>
import type { IAttributes } from "@/data/models";
import { useFilters } from "@/composables/useFilters";
const { capitalize } = useFilters();

const props = defineProps<{
  attributes: IAttributes;
}>();
</script>

<template>
  <div class="character-attributes">
    <h2>Atributos</h2>
    <span
      v-for="(attribute, key) in props.attributes"
      :key="key"
      style="display: flex; flex-direction: column"
    >
      {{ capitalize(key) }}: {{ attribute }}
    </span>
  </div>
</template>

<style>
.character-attributes {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid black;
}
</style>
