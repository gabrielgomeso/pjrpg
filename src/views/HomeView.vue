<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";

const races: Object = {
  demigod: ["sons of Ares", "sons of Hermes"],
  spirit: ["satyr", "nynph"],
  monster: ["minotaur", "dracaena"],
};

const attributes: Object = {
  strenght: 0,
  agility: 0,
  wisdom: 0,
  intelligence: 0,
  constitution: 0,
  charisma: 0,
};

const raceList = Object.keys(races);

const selectedRace: Ref<string> = ref("");
const groupOptions: Ref<any> = ref([]);
console.log(groupOptions.value.length);

function setGroups(selected: string) {
  groupOptions.value = races[selected];
}

watch(selectedRace, (newSelected) => {
  setGroups(newSelected);
});
</script>

<template>
  <main>
    <form class="character-form" action="">
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
        <select name="character-group">
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
      <label for="strenght"> Strenght: {{ attributes.strenght }}</label>

      <label for="agility"> Agility: {{ attributes.agility }} </label>

      <label for="wisdom"> Wisdom: {{ attributes.wisdom }} </label>

      <label for="intelligence">
        Intelligence: {{ attributes.intelligence }}
      </label>

      <label for="constitution">
        Constitution: {{ attributes.constitution }}
      </label>

      <label for="charisma"> Charisma: {{ attributes.charisma }} </label>
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
