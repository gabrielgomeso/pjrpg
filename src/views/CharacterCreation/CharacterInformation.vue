<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import router from "@/router";
import { buttonSounds } from "@/assets/ts/utils";

const { character_data, characterEmail } = storeToRefs(useCharacterStore());

function nextStep() {
  buttonSounds.buttonClickSound.play();
  router.push({ path: "/character_overview" });
}
</script>

<template>
  <div class="step-layout">
    <h2 class="step-title">Character Information</h2>
    <div class="step-content">
      <label class="form-label" for="character-name">
        Name:
        <input
          class="form-input full-width"
          v-model="character_data.name"
          type="text"
          name="character-name"
          placeholder="Insert the character's name"
        />
      </label>

      <label class="form-label" for="character-age">
        Age:
        <input
          class="form-input full-width"
          v-model="character_data.age"
          type="number"
          name="character-age"
          placeholder="Insert the characters age"
        />
      </label>

      <label class="form-label" for="character-email">
        E-mail:
        <input
          class="form-input full-width"
          v-model="characterEmail"
          type="email"
          name="character-email"
          placeholder="Insert your e-mail"
        />
      </label>

      <button class="form-button full-width" @click="nextStep()">
        Character Overview
      </button>
    </div>
  </div>
</template>

<style>
.character-infomation--form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
