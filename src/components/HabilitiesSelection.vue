<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
const character = storeToRefs(useCharacterStore());
const data = character.character_data.value;
</script>

<template>
  <h2>Select first two powers</h2>
  <div v-if="data.group != ''">
    <li v-for="power in groupPowers" :key="power.name">
      <label>
        <input
          type="checkbox"
          v-model="selectedPowers"
          :value="power"
          :disabled="
            selectedPowers.length > 1 && selectedPowers.indexOf(power) === -1
          "
          number
        />
        <p>Name: {{ power.name }}</p>
        <p>Description: {{ power.description }}</p>
        <p>Level 1 Effect: {{ power.effect }}</p>
      </label>
    </li>
  </div>
</template>

<style></style>
