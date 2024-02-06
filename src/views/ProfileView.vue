<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCharacterStore } from "@/stores/character";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useFilters } from "@/composables/useFilters";

const { user } = storeToRefs(useAuthStore());
const { getAllCharactersFromUser } = useCharacterStore();
const { raceFilter } = useFilters();
const fetchedCharacters = ref<any>(null);

onMounted(async () => {
  try {
    fetchedCharacters.value = await getAllCharactersFromUser(user.value.id);
  } catch {
    console.log("Erro ao buscar personagens");
  }
});
</script>

<template>
  <section class="section-container">
    <RouterLink class="profile-view__return-link" to="/">
      ⬅️ Voltar
    </RouterLink>
    <header class="section-container__header">
      <h1>Meu perfil</h1>
      <p>Todas as informações da sua conta e de seus personagens!</p>
    </header>
    <h2>Meus personagens</h2>

    <div class="profile-view__character-list">
      <RouterLink
        v-for="(character, index) in fetchedCharacters"
        :key="index"
        class="profile-view__create-character-button"
        :to="`/characters/${character.id}`"
      >
        <p style="font-weight: 800">
          {{ character.character_info.name }}
        </p>
        <p>
          {{ raceFilter(character.character_info.race) }},
          {{ character.character_info.group }}
        </p>

        <p>Nível: {{ character.character_info.level }}</p>
        <p>Experiência: {{ character.character_info.experiencePoints }}/100</p>
        <p>Origem: {{ character.character_info.origin }}</p>
        <p>Idade: {{ character.character_info.age }}</p>
      </RouterLink>

      <RouterLink
        to="/characters/new"
        class="profile-view__create-character-button"
      >
        Criar novo personagem
      </RouterLink>
    </div>
  </section>
</template>

<style>
.profile-view__return-link {
  margin: 8px 0 16px 0;
  padding: 8px;
  border-radius: 8px;
  background-color: #4d4d4d;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  display: block;
  max-width: 125px;
}

.profile-view__character-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.profile-view__create-character-button {
  text-decoration: none;
  font-weight: bold;
  color: var(--vt-c-white);
  width: 300px;
  background-color: rgb(182, 182, 182);
  transition-property: transform, box-shadow;
  transition: 0.4s ease-in-out;
  padding: 8px;
}

.profile-view__create-character-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
