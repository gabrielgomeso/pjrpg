<script setup lang="ts">
import { StepLayout } from "@/components/layout";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { buttonSounds } from "@/assets/ts/utils";
import router from "@/router";

const { character_data } = storeToRefs(useCharacterStore());

const races = {
  demigod: {
    slug: "demigod",
    name: "Demigod",
    image: "https://i.imgur.com/Jv3trNv.png",
    description:
      "Filhos de deuses e de humanos, possuem habilidades especiais e são capazes de realizar feitos incríveis.",
  },
  spirit: {
    slug: "spirit",
    name: "Nature Spirit",
    image: "https://i.imgur.com/bn1orwm.png",
    description:
      "Seres místicos conectados à natureza, possuem habilidades especiais relacionadas aos elementos da natureza.",
  },
  monster: {
    slug: "monster",
    name: "Monster",
    image: "https://i.imgur.com/TtNIu4L.png",
    description:
      "Seres mitológicos com poderes especiais ou habilidades naturais, como força, velocidade e resistência incomuns.",
  },
};

function selectRace(selectedRace: string) {
  character_data.value.race = selectedRace;
  buttonSounds.buttonClickSound.play();
  router.push({ path: "/character_group" });
}
</script>

<template>
  <StepLayout :current-step="1" :step-title="'Character Information'">
    <div class="container">
      <div v-for="race in races" :key="race.name" class="wrapper">
        <div class="race-card">
          <div class="race-card__image">
            <img :src="race.image" :alt="'A group of ' + race.name" />
          </div>
          <div class="race-card__level">Race</div>
          <div class="race-card__unit-name">{{ race.name }}</div>
          <div class="race-card__unit-description">
            {{ race.description }}
          </div>
          <router-link
            class="form-button"
            to="attribute_selection"
            @click="selectRace(race.slug)"
          >
            Select
          </router-link>
        </div>
      </div>
    </div>
  </StepLayout>
</template>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 150px;
  min-height: 800px;
}

.wrapper {
  background: transparent;
}

.race-card {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  background: transparent;
  width: 300px;
  display: inline-block;
  margin: auto;
  border-radius: var(--border-radius-size) + 5;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 1;
  transition: all 0.2s ease-in-out;
}

.race-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.race-card__image {
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: var(--border-radius-size);
  border-top-right-radius: var(--border-radius-size);
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg");
}

.race-card__image img {
  width: 320px;
  position: absolute;
  top: -30px;
  left: 0px;
}

.race-card__level {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
  color: green;
}

.race-card__unit-name {
  font-size: 26px;
  color: white;
  font-weight: 900;
  margin-bottom: 5px;
}

.race-card__unit-description {
  padding: 20px;
  margin-bottom: 10px;
}
</style>
