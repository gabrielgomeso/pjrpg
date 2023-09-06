<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCharacterStore } from "@/stores/character";
import { useFilters } from "@/composables/useFilters";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

const { user } = useAuthStore();

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

const router = useRouter();
const { statusFilter } = useFilters();
const characterStore = useCharacterStore();
const { character, status } = storeToRefs(characterStore);

async function uploadFile() {
  const characterName = character.value.name
    .replace(" ", "")
    .toLowerCase()
    .split("")
    .join("");
  console.log(characterName);
  try {
    const { data } = await supabase.storage
      .from("character-images")
      .upload(
        `${user.id}/avatar_${characterName}.jpg`,
        character.value.appeareance
      );
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function handleSubmit() {
  if (!user) return;
  try {
    await characterStore.createCharacter(character.value, user.id);
    await uploadFile();

    alert("Personagem criado com sucesso!");
    router.push("/my-profile");
  } catch (error) {
    alert("Erro ao criar personagem!");
  }
}

function returnToNewCharacter() {
  router.push({ name: "new_character" });
}

const isDemigod = (race: string) => race === "demigod";

const characterImage = computed(() => {
  return character.value.appeareance != ""
    ? character.value.appeareance
    : "https://i.imgur.com/ctOlkzy.png";
});
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Resumo do novo personagem</h1>
      <p>
        Reveja todas as informações do seu novo personagem e prepare-se para a
        aventura!
      </p>
    </header>

    <div class="preview-character__character-info">
      <figure class="preview-character__character-info-block image">
        <img
          class="preview-character__image"
          :src="characterImage"
          alt="Imagem do seu personagem"
          width="200"
          height="400"
        />
      </figure>

      <div class="preview-character__character-info-block info">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          "
        >
          <span>
            <h2>
              {{ character.name }},
              <span v-if="isDemigod(character.race)">Filho(a) de</span>
              {{ character.group }}
            </h2>
          </span>
        </div>
        <p>
          Idade:
          <span>{{ character.age }}</span>
        </p>

        <p>
          Origem:
          <span>{{ character.origin }}</span>
        </p>

        <div
          style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            gap: 12px;
            margin-top: 14px;
          "
        >
          <div>
            <h3>Hobbies</h3>
            <p>{{ character.questions.hobby }}</p>
          </div>

          <div>
            <h3>Maior segredo</h3>
            <p>{{ character.questions.secret }}</p>
          </div>

          <div>
            <h3>Maior medo</h3>
            <p>{{ character.questions.fear }}</p>
          </div>

          <div>
            <h3>Pessoas próximas</h3>
            <p>{{ character.questions.family }}</p>
          </div>

          <div>
            <h3>Maior sonho</h3>
            <p>{{ character.questions.dream }}</p>
          </div>
        </div>
      </div>

      <div class="preview-character__character-info-block attributes">
        <h2>Atributos</h2>
        <span
          v-for="(attribute, key) in character.attributes"
          :key="attribute"
          style="display: flex; flex-direction: column"
        >
          {{ capitalize(key) }}: {{ attribute }}
        </span>
      </div>

      <div class="preview-character__character-info-block others">
        <h2>Status</h2>
        <div class="preview-character__status">
          <span v-for="(points, key) in status" :key="points">
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
          <span v-for="(advantage, index) in character.advantages" :key="index">
            <p>{{ advantage.name }} ({{ advantage.cost }})</p>
            <p>{{ advantage.description }}</p>
          </span>
          <h2>Desvantagens</h2>
          <span
            v-for="(disadvantage, index) in character.disadvantages"
            :key="index"
          >
            <p>{{ disadvantage.name }} ({{ disadvantage.cost }})</p>
            <p>{{ disadvantage.description }}</p>
          </span>
        </details>

        <hr class="section-divider" />

        <details>
          <summary class="preview-character__summary">Poderes divinos</summary>
          <span
            v-for="(initialPower, index) in character.initialPowers"
            :key="index"
          >
            <p>{{ initialPower.name }}</p>
            <p>{{ initialPower.description }}</p>
          </span>
        </details>

        <hr class="section-divider" />

        <details>
          <summary class="preview-character__summary">Inventário</summary>
          <span v-for="(item, index) in character.items" :key="index">
            <p>{{ item.name }}</p>
            <p>{{ item.description }}</p>
          </span>
        </details>
      </div>
    </div>

    <div class="preview-character__buttons">
      <button
        class="new-character__form-attribute-button"
        @click="returnToNewCharacter()"
        type="submit"
      >
        Voltar
      </button>

      <button
        class="new-character__form-attribute-button"
        @click="handleSubmit()"
        type="submit"
      >
        Criar novo personagem
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

.preview-character__image {
  object-fit: cover;
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
