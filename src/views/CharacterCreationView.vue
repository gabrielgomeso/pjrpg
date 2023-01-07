<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useCharacterStore } from "@/stores/character";
import {
  AttributeSelection,
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
const step = ref(1);

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
      <CharacterInformation v-if="step == 1" />

      <AttributeSelection v-if="step == 2" />

      <StatusDisplay v-if="step == 2" />

      <HabilitiesSelection v-if="step == 3" />

      <ItemsSelection v-if="step == 4" />

      <button v-if="step > 1" class="form-button" @click="step -= 1">
        Previous
      </button>
      <button v-if="step < 4" class="form-button" @click="step += 1">
        Next
      </button>
      <button v-if="step == 4" class="form-button" @click="sendForm()">
        Create Character
      </button>
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
  gap: 1rem;
  width: 50vw;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}
</style>
