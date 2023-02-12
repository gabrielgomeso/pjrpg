<script setup lang="ts">
import { StepLayout } from "@/components/layout";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { onMounted, ref } from "vue";
import { buttonSounds } from "@/assets/ts/utils";
import router from "@/router";

const { character_data } = storeToRefs(useCharacterStore());
const groupList: any = ref([""]);

function selectGroup() {
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
      "Satyrs",
      "Nymphs",
      "Dryads",
      "Naiads",
      "Nereids",
      "Oreads",
      "Tritons",
    ];
  } else {
    groupList.value = [
      "Minotaurs",
      "Cyclops",
      "Harpys",
      "Sirens",
      "Gorgons",
      "Centaurs",
    ];
  }
});
</script>

<template>
  <StepLayout :step-title="'Character Group'">
    <div class="group-selection--group-list">
      <div
        v-for="group in groupList"
        :key="group"
        class="group-selection--group-button form-button"
        @click="selectGroup()"
      >
        {{ group }}
      </div>
    </div>
  </StepLayout>
</template>

<style>
.group-selection--group-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.group-selection--group-button {
  width: 350px;
}
</style>
