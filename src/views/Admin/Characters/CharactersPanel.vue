<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
const { getAllCharacters } = useCharacterStore();

const characterList = ref([]);

onMounted(async () => {
  try {
    characterList.value = await getAllCharacters();
  } catch (err) {
    console.error(err);
  }
});
</script>
<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Área do administrador - Painel de Personagens</h1>
    </header>

    <div class="characters-panel__characters-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Grupo</th>
            <th>Raça</th>
            <th>Nível</th>
            <th>Experiência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in characterList" :key="character.id">
            <td>{{ character.character_info.name }}</td>
            <td>{{ character.character_info.group }}</td>
            <td>{{ character.character_info.race }}</td>
            <td>{{ character.character_info.level }}</td>
            <td>{{ character.character_info.experiencePoints }}</td>
            <td>
              <button>Editar</button>
              <button>Excluir</button>
              <button>Subir de nível</button>
              <button>Dar item</button>
            </td>
          </tr>
        </tbody>
      </table>
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

.characters-panel__characters-list table {
  border: 1px solid black;
}

.characters-panel__characters-list table td {
  padding: 4px;
}

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }
}
</style>
