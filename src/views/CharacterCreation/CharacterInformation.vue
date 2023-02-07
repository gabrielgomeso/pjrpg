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
    <!-- <label class="form-label" for="character-name">
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
    </label> -->
    <div class="container">
      <div class="wrapper">
        <div class="clash-card barbarian">
          <div class="clash-card__image clash-card__image--barbarian">
            <img src="https://i.imgur.com/hImxcsa.png" alt="barbarian" />
          </div>
          <div class="clash-card__level clash-card__level--barbarian">Race</div>
          <div class="clash-card__unit-name">Demigod</div>
          <div class="clash-card__unit-description">
            The Barbarian is a kilt-clad Scottish warrior with an angry,
            battle-ready expression, hungry for destruction. He has Killer yellow
            horseshoe mustache.
          </div>
        </div>
      </div>

      <div class="wrapper">
        <div class="clash-card barbarian">
          <div class="clash-card__image clash-card__image--monsters">
            <img src="https://i.imgur.com/N6LHoB2.png" alt="barbarian" />
          </div>
          <div class="clash-card__level clash-card__level--barbarian">Race</div>
          <div class="clash-card__unit-name">Monster</div>
          <div class="clash-card__unit-description">
            The Barbarian is a kilt-clad Scottish warrior with an angry,
            battle-ready expression, hungry for destruction. He has Killer yellow
            horseshoe mustache.
          </div>
        </div>
      </div>
    </div>
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
:root {
  --border-radius-size: 14px;
}

.container {
  display: flex;
  gap: 150px;
}

.wrapper {
  padding-top: 40px;
  padding-bottom: 40px;
  background: transparent;
}

.wrapper:focus {
  outline: 0;
}

.clash-card {
  background: transparent;
  width: 300px;
  display: inline-block;
  margin: auto;
  border-radius: var(--border-radius-size) + 5;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
}

.clash-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.clash-card__image {
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: var(--border-radius-size);
  border-top-right-radius: var(--border-radius-size);
}

.clash-card__image--barbarian,
.clash-card__image--monsters {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg");
}

.clash-card__image--barbarian img {
  width: 400px;
  position: absolute;
  top: -45px;
  left: -40px;
}

.clash-card__image--monsters img {
  width: 400px;
  position: absolute;
  top: -115px;
  left: -45px;
}

.clash-card__level {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
}

.clash-card__level--barbarian {
  color: green;
}

.clash-card__unit-name {
  font-size: 26px;
  color: white;
  font-weight: 900;
  margin-bottom: 5px;
}

.clash-card__unit-description {
  padding: 20px;
  margin-bottom: 10px;
}

.clash-card__unit-stats--barbarian {
  background: green;
}

.one-third {
  border-right: 1px solid #bd7c2f;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.clash-card__unit-stats {
  color: white;
  font-weight: 700;
  border-bottom-left-radius: var(--border-radius-size);
  border-bottom-right-radius: var(--border-radius-size);
}

.one-third {
  width: 33%;
  float: left;
  padding: 20px 15px;
}

sup {
  position: absolute;
  bottom: 4px;
  font-size: 45%;
  margin-left: 2px;
}

.stat {
  position: relative;
  font-size: 24px;
  margin-bottom: 10px;
}

.stat-value {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
}

.no-border {
  border-right: none;
}
</style>
