<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { AttributeField, StatusDisplay } from "@/components";
import * as items from "../../items.json";
import * as habilities from "../../habilities.json";

const itemsList = items.items;
const habilitiesList = habilities.habilities;

const races: Object = {
  demigod: ["ares", "hermes"],
  spirit: ["satyr", "nynph"],
  monster: ["minotaur", "dracaena"],
};

const raceList = Object.keys(races);

const selectedRace: Ref<string> = ref("");
const selectedGroup: Ref<string> = ref("");
const selectedPowers: Ref<any> = ref([]);
const groupOptions: Ref<any> = ref([]);
const groupPowers: Ref<any> = ref([]);

function retrievePowers(item: any, group: string) {
  if (item.group == group) {
    return {
      name: item.name,
      description: item.description,
      effect: item["1"],
    };
  }
}

function setGroups(selected: string) {
  groupOptions.value = races[selected];
}

function setPowers(selected: string) {
  groupPowers.value = habilitiesList.map((x) => retrievePowers(x, selected));
}

// OBSERVA AS RAÇAS E SETA OS GRUPOS DAQUELA RAÇA
watch(selectedRace, (newSelectedRace) => {
  setGroups(newSelectedRace);
});

// OBSERVA O GRUPO E SETA OS PODERES DAQUELE GRUPO
watch(selectedGroup, (newGroupSelected) => {
  setPowers(newGroupSelected);
});
</script>

<template>
  <main>
    <form class="character-form" action="" @submit.prevent>
      <StatusDisplay />

      <label for="character-name">
        Character name:
        <input
          type="text"
          name="character-name"
          placeholder="Write character's name"
        />
      </label>

      <label for="character-age">
        Character age:
        <input
          type="text"
          name="character-age"
          placeholder="Write characters age"
        />
      </label>

      <label for="character-race">
        Character race:
        <select v-model="selectedRace" name="character-race">
          <option value="undefined" selected>Select characters race</option>
          <option v-for="race in raceList" :key="race" :value="race">
            {{ race }}
          </option>
        </select>
      </label>

      <label for="character-group">
        Character group:
        <select v-model="selectedGroup" name="character-group">
          <option v-if="groupOptions.length == 0" value="undefined" selected>
            Select characters race
          </option>
          <option
            v-else
            v-for="group in groupOptions"
            :key="group"
            :value="group"
          >
            {{ group }}
          </option>
        </select>
      </label>

      <h2>Attributes</h2>
      <AttributeField :attribute="'strenght'" />
      <AttributeField :attribute="'agility'" />
      <AttributeField :attribute="'wisdom'" />
      <AttributeField :attribute="'intelligence'" />
      <AttributeField :attribute="'constitution'" />
      <AttributeField :attribute="'charisma'" />

      <h2>Select first item</h2>
      <label v-for="item in itemsList" :key="item.name" :for="item.name">
        <input type="radio" name="item" :id="item.name" :value="item.name" />
        {{ item.name }}
      </label>

      <h2>Select first two powers</h2>
      <div v-if="selectedGroup != ''">
        <li v-for="power in groupPowers" :key="power.name">
          <label>
            <input
              type="checkbox"
              v-model="selectedPowers"
              :value="power"
              :disabled="
                selectedPowers.length > 1 &&
                selectedPowers.indexOf(power) === -1
              "
              number
            />
            <p>Name: {{ power.name }}</p>
            <p>Description: {{ power.description }}</p>
            <p>Level 1 Effect: {{ power.effect }}</p>
          </label>
        </li>
      </div>
    </form>
  </main>
</template>
<style>
.character-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}
</style>
