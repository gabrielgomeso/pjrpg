<script setup lang="ts">
import { StepLayout } from "@/components/layout";
</script>

<template>
  <StepLayout
    :current-step="4"
    :step-title="'Select two feats'"
    :previous-step="'habilities_selection'"
    :next-step="'items_selection'"
  >
  </StepLayout>
</template>

<style></style>
