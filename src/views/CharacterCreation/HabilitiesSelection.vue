<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { StepLayout } from "@/components/layout";
import * as habilities from "../../../habilities.json";

const { character_data } = storeToRefs(useCharacterStore());
const group = character_data.value.group;
const habilitiesList = habilities.habilities;
const groupPowers: Ref<any> = ref([]);
const selectedPowers: Ref<any> = ref([]);

function retrievePowers(item: any, group: string) {
  if (item.group == group) {
    return {
      name: item.name,
      description: item.description,
      effect: item["1"],
    };
  }
}

function setPowers(group: string) {
  groupPowers.value = habilitiesList.map((x) => retrievePowers(x, group));
}

onMounted(() => {
  setPowers("minotaur");
});
</script>

<template>
  <StepLayout
    :current-step="3"
    :step-title="`Select first two ${group} powers`"
    :previous-step="'attribute_selection'"
    :next-step="'items_selection'"
  >
    <div class="hability-card--list">
      <label
        class="hability-card"
        v-for="power in groupPowers"
        :key="power.name"
      >
        <input
          type="checkbox"
          v-model="selectedPowers"
          :value="power"
          :disabled="
            selectedPowers.length > 1 && selectedPowers.indexOf(power) === -1
          "
          number
        />
        <p>Name: {{ power.name }}</p>
        <p>Description: {{ power.description }}</p>
        <p>Level 1 Effect: {{ power.effect }}</p>
      </label>
    </div>
  </StepLayout>
</template>

<style>
.hability-card--list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hability-card {
  border: 1px solid black;
  padding: 1rem;
  max-width: 250px;
  border-radius: 10px;
  background-color: rgb(51, 51, 51);
}

.hability-card:disabled {
  border: 1px solid white;
  padding: 1rem;
  max-width: 250px;
}
</style>
