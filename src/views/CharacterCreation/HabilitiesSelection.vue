<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { StepLayout } from "@/components/layout";

const character = storeToRefs(useCharacterStore());
const data = character.character_data.value;
</script>

<template>
  <StepLayout
    :current-step="3"
    :step-title="'Select first two powers'"
    :previous-step="'attribute_selection'"
    :next-step="'items_selection'"
  >
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
  </StepLayout>
</template>

<style></style>
