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
  <section class="section-container">
    <header class="section-container__header">
      <h1>Rolagem de dados</h1>
    </header>
    <button
      class="roll-dice__dice-tray__clear-button"
      type="button"
      @click="clearDiceTray()"
    >
      Limpar resultados
    </button>
    <div class="roll-dice__dice-board">
      <div class="roll-dice__dice-tray">
        <span v-if="rolledDice.length === 1">
          Role os dados para ver os resultados!
        </span>
        <DieResult
          v-else
          v-for="(die, index) in rolledDice"
          :die-result="die.result"
          :dice-type="die.type"
          :key="index"
        />
      </div>

      <div class="roll-dice__dice-list">
        <RollDiceButton
          v-for="die in diceTypes"
          :die-sides="die"
          :key="die"
          @click="rollDie(die)"
        />
      </div>
    </div>
  </section>
</template>

<style>
.roll-dice__dice-board {
  display: flex;
  gap: 1rem;
}

.roll-dice__dice-tray {
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
  overflow: auto;
}

.roll-dice__dice-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 100px;
}

.roll-dice__dice-tray__clear-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
