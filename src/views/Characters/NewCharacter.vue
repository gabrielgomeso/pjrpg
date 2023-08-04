<script lang="ts" setup>
import { ref, computed } from "vue";

const selectedRace = ref("demigod");

const attributes = ref({
  força: 1,
  agilidade: 1,
  sabedoria: 1,
  inteligência: 1,
  constituição: 1,
  carisma: 1,
});

const groupList = computed(() => {
  if (selectedRace.value == "demigod") {
    return [
      "Filhe de Zeus",
      "Filhe de Hera",
      "Filhe de Poseidon",
      "Filhe de Demeter",
      "Filhe de Ares",
      "Filhe de Athena",
      "Filhe de Apollo",
      "Filhe de Artemis",
      "Filhe de Hefesto",
      "Filhe de Aphrodite",
      "Filhe de Hermes",
      "Filhe de Dionysus",
      "Filhe de Hades",
    ];
  } else if (selectedRace.value == "nature-spirit") {
    return [
      "Sátiro",
      "Ninfa",
      "Dríade",
      "Naiade",
      "Nereida",
      "Oreade",
      "Tritão",
    ];
  } else {
    return ["Minotauro", "Ciclope", "Harpia", "Sereia", "Górgona", "Centauro"];
  }
});

const initialPoints = 16;

const remainingPoints = computed(() => {
  const usedPoints = Object.values(attributes.value).reduce(
    (total, value) => total + value,
    0
  );
  return initialPoints - usedPoints;
});
</script>

<template>
  <section>
    <h1>Novo personagem</h1>
    <p>Crie um novo personagem e faça parte do mundo de Percy Jackson!</p>

    <hr />

    <form class="new-character__form">
      <h2>Informações do personagem</h2>
      <label for="character-name">
        Nome do personagem
        <input name="character-name" type="text" />
      </label>

      <label for="character-name">
        Idade do personagem
        <span class="new-character__form-label-info">
          (mínimo 10 anos, máximo 99 anos)
        </span>
        <input name="character-age" type="number" min="10" max="99" />
      </label>

      <label for="character-race">
        Raça do personagem
        <select v-model="selectedRace" name="character-race">
          <option value="demigod" selected>Semideus</option>
          <option value="nature-spirit">Espírito da Natureza</option>
          <option value="monster">Monstro</option>
        </select>
      </label>

      <label for="character-group">
        Grupo do personagem
        <select name="character-group">
          <option
            v-for="(group, index) in groupList"
            :key="index"
            value="demigod"
            selected
          >
            {{ group }}
          </option>
        </select>
      </label>

      <hr />

      <h2>Seleção de atributos</h2>
      <p>Você possui {{ remainingPoints }} ponto para gastar</p>
      <label
        v-for="(attribute, index) in Object.keys(attributes)"
        :for="`character-${attribute}-attribute`"
        :key="index"
      >
        {{ attribute }}
        <input
          v-model="attributes[attribute]"
          name="`character-${attribute}-attribute`"
          type="number"
          min="1"
          :max="remainingPoints + attributes[attribute]"
        />
      </label>

      <hr />

      <h2>Seleção dos primeiros itens</h2>
      <p>
        Selecione seu primeiro item. Independente do que você é, pode escolher
        diversos kits.
      </p>
      <!-- botar aqui os kits. Kit monstro, kit semideus, kit espirito da natureza. -->
    </form>
  </section>
</template>

<style>
.new-character__form,
.new-character__form label {
  display: flex;
  flex-direction: column;
}

.new-character__form {
  gap: 16px;
}

.new-character__form label {
  max-width: 260px;
  font-size: 16px;
}

.new-character__form-label-info {
  font-size: 12px;
  color: var(--color-gray-500);
}
</style>
