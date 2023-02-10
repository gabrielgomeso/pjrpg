<script setup lang="ts">
import { StepLayout } from "@/components/layout";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { Howl } from "howler";
import buttonClick from "@/assets/sounds/button_click.mp3";
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
  const buttonClickSound = new Howl({
    src: [buttonClick],
  });
  buttonClickSound.play();
  router.push({ path: "/character_group" });
}
</script>

<template>
  <StepLayout :current-step="1" :step-title="'Character Information'">
    <div class="container">
      <div v-for="race in races" :key="race.name" class="wrapper">
        <div class="clash-card barbarian">
          <div class="clash-card__image clash-card__image--monsters">
            <img :src="race.image" alt="barbarian" />
          </div>
          <div class="clash-card__level clash-card__level--barbarian">Race</div>
          <div class="clash-card__unit-name">{{ race.name }}</div>
          <div class="clash-card__unit-description">
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
:root {
  --border-radius-size: 14px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 150px;
}

.wrapper {
  background: transparent;
}

.wrapper:focus {
  outline: 0;
}

.clash-card {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  animation: float 3s ease-in-out infinite;
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

.clash-card__image--monsters img {
  width: 320px;
  position: absolute;
  top: -30px;
  left: 0px;
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

@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-10px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
  }
}
</style>
