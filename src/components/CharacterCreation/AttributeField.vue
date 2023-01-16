<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";

const { decrease, increase, attributes } = useCharacterStore();

const props = defineProps<{
  attribute: string;
}>();

const capitalizedAttribute =
  props.attribute.charAt(0).toUpperCase() + props.attribute.substring(1);
</script>

<template>
  <div class="attribute-field">
    <label for="strenght">
      {{ capitalizedAttribute }}: {{ attributes[attribute] }}
    </label>
    <button class="attribute-button" @click="increase(attribute)">+</button>
    <button class="attribute-button" @click="decrease(attribute)">-</button>
  </div>
</template>

<style>
.attribute-field {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 5px;
}

.attribute-button {
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  text-decoration: none;
  text-align: center;
  color: black;
  border: 0;
}

.attribute-button:active {
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(2px);
}
</style>
