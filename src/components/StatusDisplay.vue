<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";
import { computed } from "vue";

const character = useCharacterStore();

const healthPoints = computed(() => character.attributes.constitution * 6);
const energyPoints = computed(
  () => (character.attributes.agility + character.attributes.strenght) * 6
);
const magicPoints = computed(
  () => (character.attributes.wisdom + character.attributes.intelligence) * 6
);
</script>

<template>
  <div class="attribute-field">
    <label for="healthPoints">Health Points: {{ healthPoints }}</label>
    <label for="energyPoints">Energy Points: {{ energyPoints }}</label>
    <label for="magicPoints">Magic Points: {{ magicPoints }}</label>
  </div>
</template>
