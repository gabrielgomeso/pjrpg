<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Meu perfil</h1>
      <p>Todas as informações da sua conta e de seus personagens!</p>
    </header>
    <h2>Meus personagens</h2>
    <RouterLink
      to="/characters/new"
      class="profile-view__create-character-button"
    >
      Create new character
    </RouterLink>
    <!-- <p v-if="isLoading">Loading characters...</p>
    <ul v-else>
      <li v-for="(character, index) in characters" :key="index">
        {{ character.character_info.character_data.name }}
      </li>
    </ul> -->
  </section>
</template>

<style>
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
