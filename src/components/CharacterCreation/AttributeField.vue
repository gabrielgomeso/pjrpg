<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";

const character = useCharacterStore();

defineProps<{
  attribute: string;
}>();
</script>

<template>
  <div class="attribute-field">
    <button @click="character.increase(attribute)">+</button>
    <label for="strenght">
      {{ attribute }}: {{ character.attributes[attribute] }}
    </label>
    <button @click="character.decrease(attribute)">-</button>
  </div>
</template>
