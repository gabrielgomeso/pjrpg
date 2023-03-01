<script setup lang="ts">
import RollDiceButton from "@/components/RollDiceButton.vue";
const diceTypes = [2, 4, 6, 8, 10, 12, 20, 100];
</script>

<template>
  <div class="step-layout">
    <h1 class="step-title">Roll Dice</h1>
    <div class="step-content">
      <RollDiceButton
        v-for="dice in diceTypes"
        :dice-sides="dice"
        :key="dice"
      />
    </div>
  </div>
</template>

<style></style>
