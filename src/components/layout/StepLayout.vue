<script setup lang="ts">
import { FORM_STEPS } from "@/assets/ts/constants";
defineProps<{
  stepTitle: string;
  currentStep: number;
  previousStep?: string;
  nextStep?: string;
}>();
</script>

<template>
  <main class="character-creation-main">
    <form class="character-form" action="" @submit.prevent>
      <progress :value="currentStep" :max="FORM_STEPS"></progress>
      <h2>{{ stepTitle }}</h2>
      <slot></slot>

      <router-link v-if="previousStep" class="form-button" :to="previousStep">
        Previous
      </router-link>
      <router-link v-if="nextStep" class="form-button" :to="nextStep">
        Next
      </router-link>
    </form>
  </main>
</template>

<style>
.character-creation-main {
  display: grid;
  place-items: center;
}

.character-form {
  display: grid;
  gap: 1rem;
  min-width: 50vw;
}
</style>
