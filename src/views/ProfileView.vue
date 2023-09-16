<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { supabase } from "@/lib/supabase";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());

const fetchedCharacters = ref<any>(null);

async function getCharacters() {
  try {
    const { data: character, error } = await supabase
      .from("characters")
      .select("id, character_info")
      .eq("user_id", user.value.id);
    if (error) {
      alert("Erro ao buscar personagens: " + error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    fetchedCharacters.value = character;
    return character;
  } catch (err) {
    alert("Error while fething profile characters data");
    console.error("Unknown problem getting from the db", err);
    return null;
  }
}
onMounted(async () => {
  await getCharacters();
});
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Meu perfil</h1>
      <p>Todas as informações da sua conta e de seus personagens!</p>
    </header>
    <h2>Meus personagens</h2>

    <div class="profile-view__character-list">
      <div
        v-for="(character, index) in fetchedCharacters"
        :key="index"
        class="profile-view__create-character-button"
      >
        <RouterLink :to="`/characters/${character.id}`">
          {{ character.character_info.name }}
        </RouterLink>
      </div>

      <RouterLink
        to="/characters/new"
        class="profile-view__create-character-button"
      >
        Criar novo personagem
      </RouterLink>
    </div>

    <!-- <p v-if="isLoading">Loading characters...</p>
    <ul v-else>
      <li v-for="(character, index) in characters" :key="index">
        {{ character.character_info.character_data.name }}
      </li>
    </ul> -->
  </section>
</template>

<style>
.profile-view__character-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.profile-view__create-character-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--vt-c-white);
  width: 250px;
  height: 350px;
  background-color: rgb(182, 182, 182);
  transition: transform 0.4s ease-in-out;
  padding: 8px;
}

.profile-view__create-character-button:hover {
  transform: scale(1.05);
}
</style>
