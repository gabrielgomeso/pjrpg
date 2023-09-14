<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFilters } from "@/composables/useFilters";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";
import { CharacterAvatar } from "@/components/Characters/CharacterSheet";

const { user } = useAuthStore();
function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

const route = useRoute();
const router = useRouter();
const { statusFilter, questionsFilter } = useFilters();
const character = ref<any>([]);
const characterImage = ref<any>({ publicUrl: "" });
const isDemigod = (race: string) => race === "demigod";

async function getCharacter() {
  try {
    const { data: character_data, error } = await supabase
      .from("characters")
      .select("character_info, user_id")
      .eq("id", route.params.id);

    character.value = character_data[0].character_info;
    const userId = character_data[0].user_id;

    characterImage.value = await getCharacterAvatar(userId);

    console.log(characterImage.value);

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    return character_data;
  } catch (err) {
    alert("Error while fething the character sheet data");
    console.error("Unknown problem getting from the db", err);
    return null;
  }
}

async function getCharacterAvatar(userId: string) {
  const { data } = await supabase.storage
    .from("character-images")
    .list(userId, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (!data) return "https://i.imgur.com/ctOlkzy.png";
  const characterImage = data.find((image: any) =>
    image.name
      .split(".")
      .includes(
        `avatar_${character.value.name.toLowerCase().replace(/\s/g, "")}`
      )
  );

  const fullImageName = characterImage
    ? await getAvatarUrl(userId, characterImage.name)
    : "https://i.imgur.com/ctOlkzy.png";
  console.log(fullImageName);

  return fullImageName;
}

async function getAvatarUrl(userId: string, characterImageName: string) {
  const { data } = supabase.storage
    .from("character-images")
    .getPublicUrl(`${userId}/${characterImageName}`);

  return data.publicUrl;
}

async function deleteCharacter() {
  try {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", route.params.id);

    router.push("/my-profile");
    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await getCharacter();
});
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Ficha do personagem</h1>
      <p>Todas as informações do personagem!</p>
    </header>

    <div class="preview-character__character-info">
      <CharacterAvatar :character-avatar-url="characterImage" class="image" />

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
            <h3>Nível {{ character.level }}</h3>
            <p>Pontos de Experiência: {{ character.experiencePoints }}/100</p>
            <progress max="100" :value="character.experiencePoints"></progress>
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

        <div class="preview-character__character-questions">
          <div v-for="(question, key) in character.questions" :key="key">
            <h3>{{ questionsFilter(key.toString()) }}</h3>
            <p>{{ question }}</p>
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
        <!-- <div class="preview-character__status">
          <span v-for="(points, key) in status" :key="points">
            <div class="preview-character__status-value">
              {{ points }}
            </div>
            <span class="preview-character__status-name">
              {{ statusFilter(key) }}
            </span>
          </span>
        </div> -->

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

      <button @click="deleteCharacter()">Excluir personagem</button>
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

.preview-character__character-questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 12px;
  margin-top: 14px;
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
