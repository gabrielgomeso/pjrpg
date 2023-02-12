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
    <label :for="attribute">{{ capitalizedAttribute }}: </label>
    <button class="attribute-button" @click="increase(attribute)">+</button>
    <span class="attribute-field--attribute-value"> {{ attributes[attribute] }} </span>
    <button class="attribute-button" @click="decrease(attribute)">-</button>
  </div>
</template>

<style>
.attribute-field {
  display: grid;
  max-width: 400px;
  grid-template-columns: 1fr minmax(50px, auto) 1fr minmax(50px, auto);
  gap: 5px;
  align-items: center;
}

.attribute-field--attribute-value {
  font-size: 16px;
  font-weight: 800;
  color: green;
  border: 1px solid black;
  width: 25px;
  height: 25px;
  justify-self: center;
  text-align: center;
}

.attribute-button {
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  text-decoration: none;
  text-align: center;
  color: black;
  border: 0;
  max-width: 100px;
}

.attribute-button:active {
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(2px);
}
</style>
