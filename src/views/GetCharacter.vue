<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import CharacterSheet from "@/components/CharacterSheet.vue";

const { getCharacter } = useCharacterStore();
const { character_info } = storeToRefs(useCharacterStore());

const email = ref("");

async function findCharacter() {
  try {
    const character = await getCharacter(email.value);
    if (!character) {
      return;
    }
    character_info.value = character[0].character_info;
  } catch (err) {
    console.error("Unknown error finding character", err);
  }
}
</script>

<template>
  <section>
    <div v-if="Object.keys(character_info).length === 0" class="step-layout">
      <h2 class="step-title">Find your character</h2>
      <div class="step-content">
        <div class="find-character--container">
          <label class="form-label" for="character-email">
            Type the e-mail you registered your character:
            <input
              v-model="email"
              name="character-email"
              type="text"
              placeholder="Insert your e-mail"
              class="form-input"
            />
          </label>

          <button @click="findCharacter()" class="form-button">
            Find character
          </button>
        </div>
      </div>
    </div>

    <CharacterSheet
      v-if="Object.keys(character_info).length !== 0"
      :character_data="character_info"
    />
  </section>
</template>

<style>
.find-character--container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
