<script setup lang="ts">
import * as items from "../../../items.json";
import { StepLayout } from "@/components/layout";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";

const itemsList = items.items;
const character = storeToRefs(useCharacterStore());
const { createCharacter } = useCharacterStore();
const data = character.character_data.value;
const status = character.status.value;
const attributes = character.attributes.value;

const createdCharacter = {
  attributes: attributes,
  status: status,
  character_data: data,
};

async function sendForm() {
  try {
    const newCharacter = await createCharacter({
      character_info: createdCharacter,
    });

    if (!newCharacter) {
      return;
    }
  } catch (err) {
    console.error("Unknown error when adding todo", err);
  }
}
</script>

<template>
  <StepLayout
    :current-step="4"
    :step-title="'Select first two powers'"
    :previous-step="'habilities_selection'"
    :next-step="'character_overview'"
  >
    <label
      class="form-label"
      v-for="item in itemsList"
      :key="item.name"
      :for="item.name"
    >
      <input type="radio" name="item" :id="item.name" :value="item.name" />
      {{ item.name }}
    </label>
  </StepLayout>
</template>

<style></style>
