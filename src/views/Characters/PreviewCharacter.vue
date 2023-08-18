<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { useFilters } from "@/composables/useFilters";
import { supabase } from "@/lib/supabase";

const { raceFilter } = useFilters();
const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);

const file = ref(null);

async function uploadFile(file: any) {
  try {
    const { data } = await supabase.storage
      .from("character-images")
      .upload(`avatar_${Date.now()}.png`, file);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function handleSubmit() {
  try {
    await characterStore.createCharacter(character.value);
    await uploadFile(file.value);

    alert("Personagem criado com sucesso!");
  } catch (error) {
    alert("Erro ao criar personagem!");
  }
}
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Novo personagem</h1>
      <p>Crie um novo personagem e faça parte do mundo de Percy Jackson!</p>
    </header>

    <img
      v-if="character.appeareance"
      :src="character.appeareance"
      alt="Imagem do seu personagem"
      width="200"
      height="400"
    />

    <h2>{{ character.name }}</h2>
    <h3>{{ raceFilter(character.race) }}</h3>
    <h4>{{ character.group }}</h4>

    <p>{{ character.age }}</p>

    <p>Hobbies:</p>
    <p>{{ character.questions.hobby }}</p>

    <p>Maior segredo:</p>
    <p>{{ character.questions.secret }}</p>

    <p>Maior medo:</p>
    <p>{{ character.questions.fear }}</p>

    <p>Pessoas próximas:</p>
    <p>{{ character.questions.family }}</p>

    <p>Maior sonho:</p>
    <p>{{ character.questions.dream }}</p>

    <span
      v-for="(attribute, key) in character.attributes"
      :key="attribute"
      style="display: flex; flex-direction: column"
    >
      {{ key }}: {{ attribute }}
    </span>

    <button
      class="new-character__form-attribute-button"
      @click="handleSubmit()"
      type="submit"
    >
      Concluir
    </button>
  </section>
</template>

<style>
.section-container {
  max-width: 1024px;
  border: 1px solid rgb(80, 80, 80);
  margin: 1rem 1rem;
  padding: 1rem;
  container-type: inline-size;
  background-color: whitesmoke;
}

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }
}

.section-container__header {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgb(80, 80, 80);
}

.section-divider {
  margin: 1rem 0;
  border: none;
  border-bottom: 1px solid rgb(80, 80, 80);
}
</style>
