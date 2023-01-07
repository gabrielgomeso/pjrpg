<script setup lang="ts">
import { storeToRefs } from "pinia";import { useCharacterStore } from "@/stores/character";
import {
  AttributeField,
  StatusDisplay,
  CharacterInformation,
  HabilitiesSelection,
  ItemsSelection,
} from "@/components";

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
  <main class="character-creation-main">
    <form class="character-form" action="" @submit.prevent>
      <CharacterInformation />

      <h2>Attributes</h2>
      <AttributeField :attribute="'strenght'" />
      <AttributeField :attribute="'agility'" />
      <AttributeField :attribute="'wisdom'" />
      <AttributeField :attribute="'intelligence'" />
      <AttributeField :attribute="'constitution'" />
      <AttributeField :attribute="'charisma'" />

      <StatusDisplay />

      <HabilitiesSelection />

      <ItemsSelection />

      <button @click="sendForm()">Create Character</button>
    </form>
  </main>
</template>
<style>
.character-creation-main {
  display: grid;
  place-items: center;
  width: 100vw;
  height: var(--full-height);
}

.character-form {
  display: grid;
  width: 50vw;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}
</style>
