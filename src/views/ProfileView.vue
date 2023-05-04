<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { useAuthStore } from "@/stores/auth";

const { getCharacter } = useCharacterStore();
const { loggedUser } = storeToRefs(useAuthStore());
const isLoading = ref(true);
const characters: any = ref(null);

async function findCharacter() {
  try {
    const character = await getCharacter(loggedUser.value.email);
    if (!character) {
      return;
    }
    characters.value = character;
  } catch (err) {
    isLoading.value = false;

    alert("Unknown error finding character" + err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  findCharacter();
});
</script>

<template>
  <div class="profile-page">
    <h1>My profile</h1>
    <h2>My Characters</h2>
    <p v-if="isLoading">Loading characters...</p>
    <ul v-else>
      <li v-for="(character, index) in characters" :key="index">
        {{ character.character_info.character_data.name }}
      </li>
    </ul>
  </div>
</template>

<style></style>
