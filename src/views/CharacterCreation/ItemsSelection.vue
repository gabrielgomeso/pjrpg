<script setup lang="ts">
import * as items from "../../../items.json";
import { useCharacterStore } from "@/stores/character";
import { buttonSounds } from "@/assets/ts/utils";
import router from "@/router";
import { storeToRefs } from "pinia";

const itemsList = items.items;
const { inventory } = storeToRefs(useCharacterStore());

function selectItem(selectedItem: object) {
  inventory.value.push(selectedItem);
  buttonSounds.buttonClickSound.play();
  router.push({ path: "/character_information" });
}
</script>

<template>
  <div class="step-layout">
    <h2 class="step-title">Select first weapon</h2>
    <div class="step-content">
      <div class="container">
        <div v-for="item in itemsList" :key="item.name" class="wrapper">
          <div class="item-card">
            <div class="item-card__image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-card__level">item</div>
            <div class="item-card__unit-name">{{ item.name }}</div>
            <div class="item-card__unit-description">
              {{ item.description }}
              <p>Damage dice: {{ item.damageDice }}</p>
              <p>Weapon reach: {{ item.reach }}</p>
            </div>
            <button class="form-button full-width" @click="selectItem(item)">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  background: transparent;
}

.item-card {
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

.item-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.item-card__image {
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: var(--border-radius-size);
  border-top-right-radius: var(--border-radius-size);
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg");
}

.item-card__image img {
  width: 320px;
  position: absolute;
  top: -30px;
  left: 0px;
}

.item-card__level {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
  color: green;
}

.item-card__unit-name {
  font-size: 26px;
  color: white;
  font-weight: 900;
  margin-bottom: 5px;
}

.item-card__unit-description {
  padding: 20px;
  margin-bottom: 10px;
}
</style>
