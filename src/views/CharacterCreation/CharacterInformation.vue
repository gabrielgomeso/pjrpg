<script setup lang="ts">
// import { ref, watch, onMounted } from "vue";
// import type { Ref } from "vue";
import { StepLayout } from "@/components/layout";
// import type { ICharacterData } from "@/data/models";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { Howl } from "howler";
import buttonClick from "@/assets/sounds/button_click.mp3";

const { character_data } = storeToRefs(useCharacterStore());

let demigod = [
  "Zeus",
  "Hera",
  "Poseidon",
  "Demeter",
  "Ares",
  "Athena",
  "Apollo",
  "Artemis",
  "Hephaestus",
  "Aphrodite",
  "Hermes",
  "Dionysus",
  "Hades",
];

let spirit = [
  "Satyrs",
  "Nymphs",
  "Dryads",
  "Naiads",
  "Nereids",
  "Oreads",
  "Tritons",
];

let monster = [
  "Minotaurs",
  "Cyclops",
  "Harpys",
  "Sirens",
  "Gorgons",
  "Centaurs",
];

function selectRace(selectedRace: string) {
  character_data.value.race = selectedRace;
  const buttonClickSound = new Howl({
    src: [buttonClick],
  });
  buttonClickSound.play();
}
</script>

<template>
  <StepLayout :current-step="1" :step-title="'Character Information'">
    <label class="form-label" for="character-name">
      Name:
      <input
        class="form-input"
        v-model="character_data.name"
        type="text"
        name="character-name"
        placeholder="Insert the character's name"
      />
    </label>

    <label class="form-label" for="character-age">
      Age:
      <input
        class="form-input"
        v-model="character_data.age"
        type="number"
        name="character-age"
        placeholder="Insert the characters age"
      />
    </label>
  </StepLayout>
</template>

<style></style>
