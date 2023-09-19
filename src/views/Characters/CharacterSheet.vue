<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFilters } from "@/composables/useFilters";
import { useAuthStore } from "@/stores/auth";
import { useCharacterStore } from "@/stores/character";
import {
  CharacterAvatar,
  CharacterGeneralInfo,
  CharacterAttributes,
} from "@/components/Characters/CharacterSheet";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());
const { getCharacter, deleteCharacter } = useCharacterStore();
const { character, status } = storeToRefs(useCharacterStore());

const route = useRoute();
const router = useRouter();
const { statusFilter } = useFilters();

const isCharacterOwner = computed(
  () => user.value.id === character.value.userId
);

async function handleDeleteCharacter() {
  try {
    await deleteCharacter(route.params.id as string);
    router.push("/my-profile");
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getCharacter(route.params.id as string);
});
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Ficha do personagem</h1>
      <p>Todas as informações do personagem!</p>
    </header>

    <div class="preview-character__character-info">
      <CharacterAvatar
        :character-avatar-url="character.appeareance"
        class="image"
      />

      <CharacterGeneralInfo
        class="info"
        :age="character.age"
        :name="character.name"
        :group="character.group"
        :race="character.race"
        :level="character.level"
        :experience-points="character.experiencePoints"
        :origin="character.origin"
        :questions="character.questions"
      />

      <CharacterAttributes
        :attributes="character.attributes"
        class="attributes"
      />

      <div class="preview-character__character-info-block others">
        <h2>Status</h2>
        <div class="preview-character__status">
          <span v-for="(points, key) in status" :key="key">
            <div class="preview-character__status-value">
              {{ points }}
            </div>
            <span class="preview-character__status-name">
              {{ statusFilter(key) }}
            </span>
          </span>
        </div>

        <hr class="section-divider" />

        <details>
          <summary class="preview-character__summary">
            Vantagens e Desvantagens
          </summary>

          <h2>Vantagens</h2>
          <span v-for="advantage in character.advantages" :key="advantage.name">
            <p>{{ advantage.name }} ({{ advantage.cost }})</p>
            <p>{{ advantage.description }}</p>
          </span>
          <h2>Desvantagens</h2>
          <span
            v-for="disadvantage in character.disadvantages"
            :key="disadvantage.name"
          >
            <p>{{ disadvantage.name }} ({{ disadvantage.cost }})</p>
            <p>{{ disadvantage.description }}</p>
          </span>
        </details>

        <hr class="section-divider" />

        <details>
          <summary class="preview-character__summary">Poderes divinos</summary>
          <span
            v-for="initialPower in character.initialPowers"
            :key="initialPower.name"
          >
            <p>{{ initialPower.name }}</p>
            <p>{{ initialPower.description }}</p>
          </span>
        </details>

        <hr class="section-divider" />

        <details>
          <summary class="preview-character__summary">Inventário</summary>
          <span v-for="item in character.items" :key="item.name">
            <p>{{ item.name }}</p>
            <p>{{ item.description }}</p>
          </span>
        </details>
      </div>

      <button v-if="isCharacterOwner" @click="handleDeleteCharacter()">
        Excluir personagem
      </button>
    </div>
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

.section-container__header {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgb(80, 80, 80);
}

.section-divider {
  margin: 1rem 0;
  border: none;
  border-bottom: 1px solid rgb(80, 80, 80);
}

.preview-character__character-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-character__character-info-block {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid black;
}

.preview-character__buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.preview-character__status {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  text-align: center;
  gap: 14px;
}

.preview-character__status-name {
  margin-bottom: 14px;
}

.preview-character__status-value {
  background-color: lightgray;
  padding: 8px;
  font-size: 1.5em;
}

.preview-character__summary {
  font-size: 0.75rem;
}

.attributes {
  grid-area: attribute;
}

.image {
  grid-area: image;
}

.others {
  grid-area: others;
}

.info {
  grid-area: info;
}

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }

  .preview-character__character-info {
    display: grid;
    grid-template-areas:
      "image info"
      "attribute info"
      "attribute others";
    grid-template-columns: 1fr 5fr;
    justify-content: space-evenly;
  }
}
</style>
