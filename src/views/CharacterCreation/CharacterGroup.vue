<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { onMounted, ref } from "vue";
import { buttonSounds } from "@/assets/ts/utils";
import router from "@/router";

const { character_data } = storeToRefs(useCharacterStore());
const groupList: any = ref([""]);

function selectGroup(selectedGroup: string) {
  character_data.value.group = selectedGroup;
  buttonSounds.buttonClickSound.play();
  router.push({ path: "/attribute_selection" });
}

onMounted(() => {
  if (character_data.value.race == "demigod") {
    groupList.value = [
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
  } else if (character_data.value.race == "spirit") {
    groupList.value = [
      "Satyr",
      "Nymph",
      "Dryad",
      "Naiad",
      "Nereid",
      "Oread",
      "Triton",
    ];
  } else {
    groupList.value = [
      "Minotaur",
      "Cyclop",
      "Harpy",
      "Siren",
      "Gorgon",
      "Centaur",
    ];
  }
});
</script>

<template>
  <div class="step-layout">
    <h2 class="step-title">Choose the character's group</h2>
    <div class="step-content">
      <div class="group-selection--group-list">
        <div
          v-for="group in groupList"
          :key="group"
          class="group-selection--group-button form-button"
          @click="selectGroup(group)"
        >
          {{ group }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.group-selection--group-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.group-selection--group-button {
  width: 350px;
}
</style>
