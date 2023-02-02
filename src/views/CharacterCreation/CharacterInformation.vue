<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import { StepLayout } from "@/components/layout";
// import type { ICharacterData } from "@/data/models";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
const { character_data } = storeToRefs(useCharacterStore());

const races: Object = {
  demigod: ["ares", "hermes"],
  spirit: ["satyr", "nynph"],
  monster: ["minotaur", "dracaena"],
};
const raceList = Object.keys(races);

const selectedRace: Ref<string> = ref(character_data.value.race);
const selectedGroup: Ref<string> = ref(character_data.value.group);
const groupOptions: Ref<any> = ref(races[selectedGroup.value]);

function setGroups(selected: string) {
  groupOptions.value = races[selected];
}

// OBSERVA AS RAÇAS E SETA OS GRUPOS DAQUELA RAÇA
watch(selectedRace, (newSelectedRace) => {
  console.log(newSelectedRace);
  setGroups(newSelectedRace);
  character_data.value.race = newSelectedRace;
});

// OBSERVA O GRUPO E SETA OS PODERES DAQUELE GRUPO
watch(selectedGroup, (newGroupSelected) => {
  character_data.value.group = newGroupSelected;
});

onMounted(() => {
  if (character_data.value.race) setGroups(character_data.value.race);
});
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

    <div class="card-list">
      <label v-for="race in raceList" :key="race" :value="race">
        <input
          type="radio"
          name="character-race"
          v-model="selectedRace"
          class="card-input-element"
          :value="race"
        />

        <div class="panel panel-default card-input">
          <div class="panel-heading">{{ race }}</div>
          <div class="panel-body">This is the race {{ race }}</div>
        </div>
      </label>
    </div>

    <!-- <label class="form-label" for="character-race">
      Race:
      <select class="form-input" v-model="selectedRace" name="character-race">
        <option value="undefined" selected>Select characters race</option>
        <option v-for="race in raceList" :key="race" :value="race">
          {{ race }}
        </option>
      </select>
    </label> -->

    <div class="card-list">
      <label v-for="group in groupOptions" :key="group" :value="group">
        <input
          type="radio"
          v-model="selectedGroup"
          name="character-group"
          class="card-input-element"
          :checked="group == selectedGroup"
        />

        <div class="panel panel-default card-input">
          <div class="panel-heading">{{ group }}</div>
          <div class="panel-body">This is the group {{ group }}</div>
        </div>
      </label>
    </div>

    <!-- <label class="form-label" for="character-group">
      Group:
      <select class="form-input" v-model="selectedGroup" name="character-group">
        <option value="undefined" selected>Select characters group</option>
        <option v-for="group in groupOptions" :key="group" :value="group">
          {{ group }}
        </option>
      </select>
    </label> -->

    <router-link
      class="form-button"
      :class="{ 'form-button-disabled': false }"
      to="attribute_selection"
    >
      Next
    </router-link>
  </StepLayout>
</template>

<style>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-input-element {
  display: none;
}

.card-input {
  margin: 10px;
  padding: 00px;
}

.card-input:hover {
  cursor: pointer;
}

.card-input-element:checked + .card-input {
  box-shadow: 0 0 1px 1px #2ecc71;
}
</style>
