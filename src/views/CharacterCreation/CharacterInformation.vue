<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { StepLayout } from "@/components/layout";
import type { ICharacterData } from "@/data/models";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
const { character_data } = storeToRefs(useCharacterStore());

const races: Object = {
  demigod: ["ares", "hermes"],
  spirit: ["satyr", "nynph"],
  monster: ["minotaur", "dracaena"],
};
const raceList = Object.keys(races);

const selectedRace: Ref<string> = ref("");
const selectedGroup: Ref<string> = ref("");
const groupOptions: Ref<any> = ref([]);

const form: Ref<ICharacterData> = ref({
  name: "",
  age: "",
  group: "",
  race: "",
});

function setGroups(selected: string) {
  groupOptions.value = races[selected];
}

function setCharacterInformationToStore() {
  character_data.value = form.value;
}

// OBSERVA AS RAÇAS E SETA OS GRUPOS DAQUELA RAÇA
watch(selectedRace, (newSelectedRace) => {
  setGroups(newSelectedRace);
  form.value.race = newSelectedRace;
});

// OBSERVA O GRUPO E SETA OS PODERES DAQUELE GRUPO
watch(selectedGroup, (newGroupSelected) => {
  form.value.group = newGroupSelected;
});
</script>

<template>
  <StepLayout :current-step="1" :step-title="'Character Information'">
    <label class="form-label" for="character-name">
      Name:
      <input
        class="form-input"
        v-model="form.name"
        type="text"
        name="character-name"
        placeholder="Insert the character's name"
      />
    </label>

    <label class="form-label" for="character-age">
      Age:
      <input
        class="form-input"
        v-model="form.age"
        type="number"
        name="character-age"
        placeholder="Insert the characters age"
      />
    </label>

    <label class="form-label" for="character-race">
      Race:
      <select class="form-input" v-model="selectedRace" name="character-race">
        <option value="undefined" selected>Select characters race</option>
        <option v-for="race in raceList" :key="race" :value="race">
          {{ race }}
        </option>
      </select>
    </label>

    <label class="form-label" for="character-group">
      Group:
      <select class="form-input" v-model="selectedGroup" name="character-group">
        <option value="undefined" selected>Select characters group</option>
        <option v-for="group in groupOptions" :key="group" :value="group">
          {{ group }}
        </option>
      </select>
    </label>

    <router-link
      class="form-button"
      :class="{ 'form-button-disabled': false }"
      to="attribute_selection"
      @click="setCharacterInformationToStore()"
    >
      Next
    </router-link>
  </StepLayout>
</template>

<style></style>
