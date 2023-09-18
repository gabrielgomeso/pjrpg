<script lang="ts" setup>
import type { IQuestions } from "@/data/models";
import { useFilters } from "@/composables/useFilters";
const isDemigod = (race: string) => race === "demigod";
const { questionsFilter } = useFilters();

const props = defineProps<{
  name: string;
  age: number;
  group: string;
  race: string;
  level: number;
  experiencePoints: number;
  origin: string;
  questions: IQuestions;
}>();
</script>

<template>
  <div class="character-general-info">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      "
    >
      <span>
        <h2>
          {{ props.name }},
          <span v-if="isDemigod(props.race)">Filho(a) de</span>
          {{ props.group }}
        </h2>
        <h3>Nível {{ props.level }}</h3>
        <p>Pontos de Experiência: {{ props.experiencePoints ?? 0 }}/100</p>
        <progress max="100" :value="props.experiencePoints ?? 0"></progress>
      </span>
    </div>
    <p>
      Idade:
      <span>{{ props.age }}</span>
    </p>

    <p>
      Origem:
      <span>{{ props.origin }}</span>
    </p>

    <div class="character-general-info__questions">
      <div v-for="(question, key, index) in props.questions" :key="key + index">
        <h3>{{ questionsFilter(key.toString()) }}</h3>
        <p>{{ question }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.character-general-info {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid black;
}

.character-general-info__questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 12px;
  margin-top: 14px;
}
</style>
