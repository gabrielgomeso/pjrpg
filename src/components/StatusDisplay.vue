<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";
import { computed } from "vue";
import { STATUS_MULTIPLIER, HEROIC_MULTIPLIER } from "@/assets/ts/constants";

const character = useCharacterStore();

const healthPoints = computed(
  () => character.attributes.constitution * STATUS_MULTIPLIER
);

const energyPoints = computed(
  () =>
    (character.attributes.agility + character.attributes.strenght) *
    STATUS_MULTIPLIER
);

const magicPoints = computed(
  () =>
    (character.attributes.wisdom + character.attributes.intelligence) *
    STATUS_MULTIPLIER
);

const heroicPoints = computed(
  () => character.attributes.charisma * HEROIC_MULTIPLIER
);
</script>

<template>
  <div class="attribute-field">
    <label for="healthPoints"> Health Points: {{ healthPoints }}</label>
    <label for="energyPoints">Energy Points: {{ energyPoints }}</label>
    <label for="magicPoints">Magic Points: {{ magicPoints }}</label>
    <label for="heroicPoints">Heroic Points: {{ heroicPoints }}</label>
  </div>
</template>
