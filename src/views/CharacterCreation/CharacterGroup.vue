<script setup lang="ts">
import { StepLayout } from "@/components/layout";
import { Howl } from "howler";
import buttonClick from "@/assets/sounds/button_click.mp3";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { onMounted, ref } from "vue";

const { character_data } = storeToRefs(useCharacterStore());
const groupList: any = ref([""]);

function selectGroup() {
  const buttonClickSound = new Howl({
    src: [buttonClick],
  });
  buttonClickSound.play();
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
  console.log(character_data.value.race);
});
</script>

<template>
  <StepLayout :step-title="'Character Group'">
    <div>
      <div v-for="group in groupList" :key="group" class="group-list">
        {{ group }}
        <router-link
          class="form-button"
          to="attribute_selection"
          @click="selectGroup()"
        >
          Select
        </router-link>
      </div>
    </div>
  </StepLayout>
</template>

<style>
.group-list {
  display: flex;
  flex-direction: row;
}
</style>
