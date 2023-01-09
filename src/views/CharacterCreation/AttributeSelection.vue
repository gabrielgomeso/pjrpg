<script setup lang="ts">
import { AttributeField, StatusDisplay } from "@/components/CharacterCreation";
import { StepLayout } from "@/components/layout";
</script>

<template>
  <StepLayout
    :current-step="2"
    :step-title="'Attribute Selection'"
    :previous-step="'character_creation'"
    :next-step="'habilities_selection'"
  >
    <AttributeField :attribute="'strenght'" />
    <AttributeField :attribute="'agility'" />
    <AttributeField :attribute="'wisdom'" />
    <AttributeField :attribute="'intelligence'" />
    <AttributeField :attribute="'constitution'" />
    <AttributeField :attribute="'charisma'" />

    <StatusDisplay />
  </StepLayout>
</template>

<style></style>
