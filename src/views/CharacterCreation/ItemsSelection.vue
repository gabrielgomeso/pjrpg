<script setup lang="ts">
import * as items from "../../../items.json";
import { StepLayout } from "@/components/layout";
import { useCharacterStore } from "@/stores/character";

const itemsList = items.items;
const { inventory } = useCharacterStore();
</script>

<template>
  <StepLayout
    :current-step="5"
    :step-title="'Select first weapon'"
    :previous-step="'habilities_selection'"
    :next-step="'character_overview'"
  >
    <label
      class="form-label"
      v-for="item in itemsList"
      :key="item.name"
      :for="item.name"
    >
      <input
        v-model="inventory"
        type="radio"
        name="item"
        :id="item.name"
        :value="item.name"
      />
      {{ item.name }}
    </label>
  </StepLayout>
</template>

<style></style>
