<script setup lang="ts">
import { RollDiceButton, DieResult } from "@/components/DiceRoll";
import { ref } from "vue";
const diceTypes = [2, 4, 6, 8, 10, 12, 20, 100];

const rolledDice = ref([{}]);

function rollDie(die: number) {
  rolledDice.value.push({
    type: die,
    result: Math.floor(die * Math.random()) + 1,
  });
}

function clearDiceTray() {
  rolledDice.value = [{}];
}
</script>

<template>
  <div class="step-layout">
    <h1 class="step-title">Roll Dice</h1>
    <div class="step-content">
      <div class="roll-dice--dice-tray">
        <DieResult
          v-for="(die, index) in rolledDice"
          :die-result="die.result"
          :dice-type="die.type"
          :key="index"
        />
        <button
          class="roll-dice--dice-tray__clear-button"
          type="button"
          @click="clearDiceTray()"
        >
          Clear
        </button>
      </div>
      <RollDiceButton
        v-for="die in diceTypes"
        :die-sides="die"
        :key="die"
        @click="rollDie(die)"
      />
    </div>
  </div>
</template>

<style>
.roll-dice--dice-tray {
  width: 500px;
  padding: 0.5rem;
  min-height: 400px;
  background-color: whitesmoke;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  flex-flow: row wrap;
  align-content: flex-start;
}

.roll-dice--dice-tray__clear-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
