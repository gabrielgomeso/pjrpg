<script setup lang="ts">
import { StepLayout } from "@/components/layout";
import * as feats from "../../../feats.json";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
const { attributes } = storeToRefs(useCharacterStore());
const intelligence_bonus = attributes.value.intelligence;

const { talents, skills, knowledges } = feats;
</script>

<template>
  <StepLayout
    :current-step="4"
    :step-title="'Select your feats'"
    :previous-step="'habilities_selection'"
    :next-step="'items_selection'"
  >
    <h4>
      You can select 1 talent, 2 skills, 1 knowledge, and
      {{ intelligence_bonus }} other feats that you want because of your
      intelligence bonus.
    </h4>
    <h3>Select 1 talent</h3>
    <div class="feat-list">
      <span v-for="talent in talents">{{ talent }}</span>
    </div>

    <h3>Select 2 skills</h3>
    <div class="feat-list">
      <span class="feat-list" v-for="skill in skills">{{ skill }}</span>
    </div>

    <h3>Select 1 knowledge</h3>
    <div class="feat-list">
      <span class="feat-list" v-for="knowledge in knowledges">{{ knowledge }}</span>
    </div>
  </StepLayout>
</template>

<style>
.feat-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
