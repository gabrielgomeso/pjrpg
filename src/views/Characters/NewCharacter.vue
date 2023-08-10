<script lang="ts" setup>
import { ref, computed } from "vue";
import * as habilities from "../../../habilities.json";
import * as itemsList from "../../../items.json";
import * as feats from "../../../feats.json";
import { useCharacterStore } from "@/stores/character";

const characterStore = useCharacterStore();

const character = ref({
  name: "",
  appeareance: "",
  age: 10,
  race: "demigod",
  group: "Afrodite",
  questions: {
    hobby: "",
    secret: "",
    fear: "",
    family: "",
    dream: "",
  },
  attributes: {
    força: 1,
    agilidade: 1,
    sabedoria: 1,
    inteligência: 1,
    constituição: 1,
    carisma: 1,
  },
  items: [],
  advantages: [],
  disadvantages: [],
  initialPowers: [],
});

const groupList = computed(() => {
  if (character.value.race == "demigod") {
    return [
      "Zeus",
      "Hera",
      "Poseidon",
      "Demeter",
      "Ares",
      "Athena",
      "Apollo",
      "Artemis",
      "Hefesto",
      "Afrodite",
      "Hermes",
      "Dionísio",
      "Hades",
      "Thanatos",
    ];
  } else if (character.value.race == "nature-spirit") {
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
  const usedPoints = Object.values(character.value.attributes).reduce(
    (total, value) => total + value,
    0
  );
  return initialPoints - usedPoints;
});

const advantagePoints = computed(() => {
  return character.value.advantages.reduce(
    (total, advantage) => total + advantage.cost,
    0
  );
});

const disavantagePoints = computed(() => {
  return character.value.disadvantages.reduce(
    (total, disadvantage) => total + disadvantage.cost,
    0
  );
});

const differenceAdvantagePoints = computed(() => {
  return advantagePoints.value - disavantagePoints.value;
});

const advantageKeys = computed(() => Object.keys(feats.advantages));
const disadvantageKeys = computed(() => Object.keys(feats.disadvantages));

async function handleSubmit() {
  try {
    await characterStore.createCharacter(character.value);
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

    <form class="new-character__form" @submit.prevent="handleSubmit()">
      <h2>Informações do personagem</h2>
      <div class="new-character__form-information-grid">
        <label for="character-name">
          Nome do personagem
          <input
            class="new-character__form-input"
            name="character-name"
            type="text"
            v-model="character.name"
          />
        </label>

        <label for="character-name">
          <p>
            Idade do personagem
            <span class="new-character__form-label-info">
              (mínimo 10 anos, máximo 99 anos)
            </span>
          </p>
          <input
            class="new-character__form-input"
            name="character-age"
            type="number"
            min="10"
            max="99"
            v-model="character.age"
          />
        </label>

        <label for="character-race">
          Raça do personagem
          <select
            class="new-character__form-input"
            v-model="character.race"
            name="character-race"
          >
            <option value="demigod" selected>Semideus</option>
            <option value="nature-spirit">Espírito da Natureza</option>
            <option value="monster">Monstro</option>
          </select>
        </label>

        <label for="character-group">
          Grupo do personagem
          <select
            class="new-character__form-input"
            name="character-group"
            v-model="character.group"
          >
            <option
              v-for="(group, index) in groupList"
              :key="index"
              :value="group"
              :selected="index == 0"
            >
              {{ group }}
            </option>
          </select>
        </label>

        <label for="character-appearance">
          Aparência do personagem
          <span class="new-character__form-label-info">
            (imagem preferencialmente 200x400, máx 2MB)
          </span>
          <input
            class="new-character__form-input"
            name="character-appearance"
            type="file"
            accept="image/*"
          />
        </label>
      </div>

      <hr class="section-divider" />

      <h2>Perguntas sobre o personagem</h2>

      <div class="new-character__form-information-grid">
        <label for="character-question-hobby">
          Seu personagem tem algum interesse ou hobby? Onde e por que começou a
          praticá-lo?

          <textarea
            class="new-character__form-input"
            v-model="character.questions.hobby"
            name="character-question-hobby"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label for="character-question-secret">
          Fale um segredo que o seu personagem esconde dos outros. Por que ele
          mantém esse segredo?

          <textarea
          class="new-character__form-input"
            v-model="character.questions.secret"
            name="character-question-secret"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label for="character-question-fear">
          Seu personagem possui um medo ou fobia? Como isso afeta ele?

          <textarea
          class="new-character__form-input"
            v-model="character.questions.fear"
            name="character-question-fear"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label for="character-question-family">
          Fale de alguém que seu personagem se importa. O que ele faria para
          proteger essa pessoa?

          <textarea
          class="new-character__form-input"
            v-model="character.questions.family"
            name="character-question-family"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label for="character-question-dream">
          Qual o maior sonho do seu personagem? O que ele faria para realizá-lo?

          <textarea
          class="new-character__form-input"
            v-model="character.questions.dream"
            name="character-question-dream"
            cols="15"
            rows="5"
          ></textarea>
        </label>
      </div>
      <hr class="section-divider" />

      <h2>Seleção de atributos</h2>
      <p>Você possui {{ remainingPoints }} ponto para gastar</p>

      <div class="new-character__form-information-grid">
        <label
          v-for="(attribute, index) in Object.keys(character.attributes)"
          :for="`character-${attribute}-attribute`"
          :key="index"
        >
          {{ attribute.toUpperCase() }}
          <input
          class="new-character__form-input"
            v-model="character.attributes[attribute]"
            name="`character-${attribute}-attribute`"
            type="number"
            min="1"
          />
        </label>
      </div>
      <hr class="section-divider" />

      <h2>Seleção dos primeiros itens</h2>

      <fieldset>
        <legend class="form__fieldset-legend">
          Você tem direito a 3 itens iniciais. Não precisa se preocupar,
          conseguirá novos ao longo de sua jornada.
        </legend>

        <details class="form__details">
          <summary>Lista de items</summary>

          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in itemsList['default']"
              :for="`character-item-${index}`"
              :key="index"
              class="new-character__form-items-list-item"
            >
              <p class="new-character__form-items-list-item--title">
                {{ item.name.toUpperCase() }}
              </p>
              <p v-show="item.description">{{ item.description }}</p>
              <p v-show="item.damage">Dano: {{ item.damage }}</p>
              <p v-show="item.resistence">Resistência: {{ item.resistence }}</p>
              <p v-show="item.effect">Efeito: {{ item.effect }}</p>
              <input
                type="checkbox"
                :name="item.name"
                v-model="character.items"
                :disabled="
                  character.items.length === 3 &&
                  !character.items.includes(item)
                "
                :value="item"
              />
            </label>
          </div>
        </details>
      </fieldset>

      <hr class="section-divider" />

      <h2>Seleção das vantagens e desvantagens</h2>

      <h3>Vantagens</h3>
      <fieldset>
        <legend class="form__fieldset-legend">
          Você selecionou {{ advantagePoints }} pontos de vantagem. Selecione o
          equivalente em desvantagens.
        </legend>

        <details
          class="form__details"
          v-for="(advantage, index) in advantageKeys"
          :key="index"
        >
          <summary>{{ advantage.toUpperCase() }}</summary>
          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in feats.advantages[advantage]"
              :for="`character-advantage-${index}`"
              :key="index"
              class="checkbox-wrapper"
            >
              <input
                type="checkbox"
                class="checkbox-input"
                :name="item.name"
                v-model="character.advantages"
                :value="item"
              />

              {{ item.name }} ({{ item.cost }})
            </label>
          </div>
        </details>
      </fieldset>

      <h3>Desvantagens</h3>
      <fieldset>
        <legend class="form__fieldset-legend">
          Você selecionou {{ disavantagePoints }} pontos de desvantagens.
          Selecione mais {{ differenceAdvantagePoints }} pontos em desvantagens
          para .
        </legend>

        <details
          class="form__details"
          v-for="(disadvantage, index) in disadvantageKeys"
          :key="index"
        >
          <summary>{{ disadvantage.toUpperCase() }}</summary>
          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in feats.disadvantages[disadvantage]"
              :for="`character-disadvantage-${index}`"
              :key="index"
              class="checkbox-wrapper"
            >
              <input
                type="checkbox"
                class="checkbox-input"
                :name="item.name"
                v-model="character.disadvantages"
                :value="item"
              />

              {{ item.name }} ({{ item.cost }})
            </label>
          </div>
        </details>
      </fieldset>

      <hr class="section-divider" />

      <h2>Poderes iniciais ({{ character.group }})</h2>
      <fieldset>
        <legend class="form__fieldset-legend">
          Você pode selecionar até 2 poderes inicias referentes a sua origem
          divina.
        </legend>

        <div class="new-character__form-items-list">
          <label
            v-for="(hability, index) in habilities[character.group]"
            :for="`character-power-${index}`"
            :key="index"
            class="checkbox-wrapper"
          >
            <input
              type="checkbox"
              class="checkbox-input"
              :name="hability.name"
              v-model="character.initialPowers"
              :value="hability"
              :disabled="
                character.initialPowers.length === 2 &&
                !character.initialPowers.includes(hability)
              "
            />

            <p class="new-character__form-items-list-item--title">
              {{ hability.name }}
            </p>
            <p>{{ hability.description }}</p>
            <p>Nível 1: {{ hability.levels["1"] }}</p>
          </label>
        </div>
      </fieldset>

      <button @click="handleSubmit()">Criar personagem</button>
    </form>
  </section>
</template>

<style>
.section-container {
  max-width: 1024px;
  border: 1px solid rgb(80, 80, 80);
  margin: 1rem auto;
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

.form__fieldset-legend {
  padding: 0.5rem;
}

.form__details {
  padding: 0.5rem;
  cursor: pointer;
}

.new-character__form-information-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@container (width > 768px) {
  .new-character__form-information-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.new-character__form {
  gap: 16px;
}

.new-character__form,
.new-character__form label {
  display: flex;
  flex-direction: column;
}

.new-character__form label {
  font-size: 18px;
}

.new-character__form-input {
  padding: 4px;
  font-size: 18px;
  line-height: 1.5;
  border: 2px solid black;
}

/* .new-character__form-input:focus {
  outline: 4px solid green;
} */

.new-character__form-label-info {
  font-size: 12px;
  color: var(--color-gray-500);
}

.new-character__form-items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.new-character__form-items-list-item {
  display: block;
  max-width: 260px;
  padding: 8px;
}

.new-character__form-items-list-item--title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}
</style>
