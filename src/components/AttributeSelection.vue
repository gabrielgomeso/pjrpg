<script setup lang="ts">
import AttributeField from "./AttributeField.vue";
</script>

<template>
  <h2>Attributes</h2>
  <AttributeField :attribute="'strenght'" />
  <AttributeField :attribute="'agility'" />
  <AttributeField :attribute="'wisdom'" />
  <AttributeField :attribute="'intelligence'" />
  <AttributeField :attribute="'constitution'" />
  <AttributeField :attribute="'charisma'" />
</template>

<style>
</style>
