<script setup lang="ts">
import { AttributeField, StatusDisplay } from "@/components/CharacterCreation";
import { useCharacterStore } from "@/stores/character";
import { buttonSounds } from "@/assets/ts/utils";

const { attributes } = useCharacterStore();
</script>

<template>
  <div class="step-container">
    <h2 class="step-title">Attribute Selection</h2>
    <section class="attribute-selection--container">
      <div>Available Points: {{ attributes.available }}</div>
      <AttributeField :attribute="'strenght'" />
      <AttributeField :attribute="'agility'" />
      <AttributeField :attribute="'wisdom'" />
      <AttributeField :attribute="'intelligence'" />
      <AttributeField :attribute="'constitution'" />
      <AttributeField :attribute="'charisma'" />
      <StatusDisplay />
    </section>
    <router-link
      to="/items_selection"
      @click="buttonSounds.buttonClickSound.play()"
      class="form-button"
      >Conffirm choices</router-link
    >
  </div>
</template>

<style>
.attribute-selection--container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
