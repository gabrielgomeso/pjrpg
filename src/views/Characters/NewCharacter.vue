<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import * as habilities from "../../../habilities.json";
import * as itemsList from "../../../items.json";
import * as feats from "../../../feats.json";
import { useCharacterStore } from "@/stores/character";
import { supabase } from "@/lib/supabase";
import { useRouter } from "vue-router";
import { useFilters } from "@/composables/useFilters";

const { statusFilter } = useFilters();
const router = useRouter();
const characterStore = useCharacterStore();
const { character, status } = storeToRefs(characterStore);

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
      "Dionisio",
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

const file = ref(null);

const handleFileInputChange = (event: any) => {
  file.value = event.target.files[0];
  if (file.value) character.value.appeareance = file.value;
  if (!file.value) return;
};

const advantageKeys = computed(() => Object.keys(feats.advantages));
const disadvantageKeys = computed(() => Object.keys(feats.disadvantages));

function handleSubmit() {
  router.push({ name: "preview_character" });
}

function changeAttributeValue(action: string, attribute: string) {
  if (action == "increase") {
    if (remainingPoints.value > 0) {
      character.value.attributes[attribute] += 1;
    }
  } else {
    if (character.value.attributes[attribute] > 1) {
      character.value.attributes[attribute] -= 1;
    }
  }
}

function shouldDisableCheckbox(item) {
  const selectedCount = character.value.items.length;
  const maxSelections = 3;

  // If the item is selected, it should remain enabled
  if (character.value.items.includes(item)) {
    return false;
  }

  // If maximum selections are reached, disable unchecked items
  if (selectedCount == maxSelections) {
    return true;
  }

  return false;
}
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Novo personagem</h1>
      <p>Crie um novo personagem e faça parte do mundo de Percy Jackson!</p>
    </header>

    <form class="new-character__form" @submit.prevent>
      <h2>Informações do personagem</h2>
      <div class="new-character__form-information-grid">
        <label class="new-character__form-label" for="character-name">
          Nome do personagem
          <input
            class="new-character__form-input"
            placeholder="Percy Jackson da Silva"
            name="character-name"
            type="text"
            v-model="character.name"
          />
        </label>

        <label class="new-character__form-label" for="character-name">
          <p>
            Idade do personagem
            <span class="new-character__form-label-info">
              (mínimo 10 anos, máximo 99 anos)
            </span>
          </p>
          <input
            placeholder="12"
            class="new-character__form-input"
            name="character-age"
            type="number"
            min="10"
            max="99"
            v-model="character.age"
          />
        </label>

        <label class="new-character__form-label" for="character-name">
          <p>Nacionalidade do personagem</p>
          <input
            placeholder="Caraguatatuba, Brasil"
            class="new-character__form-input"
            name="character-origin"
            type="text"
            v-model="character.origin"
          />
        </label>

        <label class="new-character__form-label" for="character-race">
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

        <label class="new-character__form-label" for="character-group">
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

        <label class="new-character__form-label" for="character-appearance">
          <p>
            Aparência do personagem
            <span class="new-character__form-label-info">
              (imagem 200x400, máx 2MB)
            </span>
          </p>
          <input
            class="new-character__form-input"
            name="character-appearance"
            type="file"
            accept="image/*"
            @change="handleFileInputChange"
          />
        </label>
      </div>

      <hr class="section-divider" />

      <h2>Perguntas sobre o personagem</h2>

      <div class="new-character__form-information-grid">
        <label class="new-character__form-label" for="character-question-hobby">
          Seu personagem tem algum interesse ou hobby? Onde e por que começou a
          praticá-lo?

          <textarea
            class="new-character__form-input"
            placeholder="Marcenaria, começou a praticar quando tinha 10 anos e seu pai o ensinou."
            v-model="character.questions.hobby"
            name="character-question-hobby"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label
          class="new-character__form-label"
          for="character-question-secret"
        >
          Fale um segredo que o seu personagem esconde dos outros. Por que ele
          mantém esse segredo?

          <textarea
            class="new-character__form-input"
            placeholder="Foi expulso de uma escola por ter sido pego roubando. Não sabem, mas ele gosta muito de roubar."
            v-model="character.questions.secret"
            name="character-question-secret"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label class="new-character__form-label" for="character-question-fear">
          Seu personagem possui um medo ou fobia? Como isso afeta ele?

          <textarea
            class="new-character__form-input"
            placeholder="Extremo medo de aranhas. Ele não consegue nem olhar para uma. Fica catatonico."
            v-model="character.questions.fear"
            name="character-question-fear"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label
          class="new-character__form-label"
          for="character-question-family"
        >
          Fale de alguém que seu personagem se importa. O que ele faria para
          proteger essa pessoa?

          <textarea
            class="new-character__form-input"
            placeholder="Seu pai, que o criou sozinho. Ele faria qualquer coisa para protegê-lo."
            v-model="character.questions.family"
            name="character-question-family"
            cols="15"
            rows="5"
          ></textarea>
        </label>

        <label class="new-character__form-label" for="character-question-dream">
          Qual o maior sonho do seu personagem? O que ele faria para realizá-lo?

          <textarea
            class="new-character__form-input"
            placeholder="Ser um grande herói e ser reconhecido por isso. Ele faria qualquer coisa para realizar esse sonho."
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
          class="new-character__form-label"
          v-for="(attribute, index) in Object.keys(character.attributes)"
          :for="`character-${attribute}-attribute`"
          :key="index"
        >
          {{ attribute.toUpperCase() }}
          <div class="new-character__form-attribute-group">
            <button
              @click="changeAttributeValue('increase', attribute)"
              class="new-character__form-attribute-button"
              type="button"
            >
              +
            </button>
            <input
              class="new-character__form-input new-character__form-attribute-input"
              v-model="character.attributes[attribute]"
              name="`character-${attribute}-attribute`"
              type="number"
              min="1"
            />
            <button
              @click="changeAttributeValue('decrease', attribute)"
              class="new-character__form-attribute-button"
              type="button"
            >
              -
            </button>
          </div>
        </label>

        <div>
          <h2>
            Status
            <span class="new-character__form-label-info">
              (gerados automaticamente pelos atributos)
            </span>
          </h2>

          <div>
            <p v-for="(item, key) in status" :key="key">
              {{ statusFilter(key) }}: {{ item }}
            </p>
          </div>
        </div>
      </div>
      <hr class="section-divider" />

      <h2>Seleção dos primeiros itens</h2>

      <fieldset>
        <legend class="form__fieldset-legend">
          Você tem direito a 3 itens iniciais. Não precisa se preocupar,
          conseguirá novos ao longo de sua jornada.
        </legend>

        <details class="form__details">
          <summary class="form__summary">Lista de items</summary>

          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in itemsList['default']"
              :for="`character-item-${index}`"
              :key="index"
              class="new-character__form-items-list-item"
            >
              <input
                type="checkbox"
                :name="item.name"
                v-model="character.items"
                class="new-character__form-checkbox"
                :disabled="shouldDisableCheckbox(item)"
                :value="item"
              />
              <div class="new-character__form-checkbox-tile">
                <p class="new-character__form-items-list-item--title">
                  {{ item.name.toUpperCase() }}
                </p>
                <p v-show="item.description">{{ item.description }}</p>
                <p v-show="item.damage">Dano: {{ item.damage }}</p>
                <p v-show="item.resistence">
                  Resistência: {{ item.resistence }}
                </p>
                <p v-show="item.effect">Efeito: {{ item.effect }}</p>
              </div>
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
          :close="character.items.length === 3"
        >
          <summary>{{ advantage.toUpperCase() }}</summary>
          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in feats.advantages[advantage]"
              :for="`character-advantage-${index}`"
              :key="index"
              class="new-character__form-items-list-item"
            >
              <input
                type="checkbox"
                class="new-character__form-checkbox"
                :name="item.name"
                v-model="character.advantages"
                :value="item"
              />

              <div class="new-character__form-checkbox-tile">
                {{ item.name }} ({{ item.cost }})
                <p>{{ item.description }}</p>
              </div>
            </label>
          </div>
        </details>
      </fieldset>

      <h3>Desvantagens</h3>
      <fieldset>
        <legend class="form__fieldset-legend">
          Você selecionou {{ disavantagePoints }} pontos de desvantagens.
          Selecione mais {{ differenceAdvantagePoints }} pontos em desvantagens
          para equilibrar seu personagem.
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
              class="new-character__form-items-list-item"
            >
              <input
                type="checkbox"
                class="new-character__form-checkbox"
                :name="item.name"
                v-model="character.disadvantages"
                :value="item"
              />
              <div class="new-character__form-checkbox-tile">
                {{ item.name }} ({{ item.cost }})
                <p>{{ item.description }}</p>
              </div>
            </label>
          </div>
        </details>
      </fieldset>

      <hr class="section-divider" />

      <h2>Poderes iniciais ({{ character.group }})</h2>
      <fieldset class="form__details">
        <legend class="form__fieldset-legend">
          Você pode selecionar até 2 poderes inicias referentes a sua origem
          divina.
        </legend>

        <div class="new-character__form-items-list">
          <label
            v-for="(ability, index) in habilities[character.group]"
            :for="`character-power-${index}`"
            :key="index"
            class="new-character__form-items-list-item"
          >
            <input
              type="checkbox"
              class="new-character__form-checkbox"
              :name="ability.name"
              v-model="character.initialPowers"
              :value="ability"
              :disabled="
                character.initialPowers.length === 2 &&
                !character.initialPowers.includes(ability)
              "
            />
            <div class="new-character__form-checkbox-tile">
              <p class="new-character__form-items-list-item--title">
                {{ ability.name }}
              </p>
              <p>{{ ability.description }}</p>
              <p>Nível 1: {{ ability.levels["1"] }}</p>
            </div>
          </label>
        </div>
      </fieldset>

      <button
        @click="handleSubmit()"
        class="new-character__form-attribute-button"
        type="submit"
      >
        Concluir
      </button>
    </form>
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

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }
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
  font-size: 16px;
}

.form__details {
  padding: 0.5rem;
}

.form__summary {
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
.new-character__form-label {
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
  width: 100%;
}

.new-character__form-attribute-group {
  display: flex;
  flex-direction: row;
}

.new-character__form-attribute-input {
  text-align: center;
}

.new-character__form-attribute-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  margin: 0 12px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
}

.new-character__form-label-info {
  font-size: 12px;
  color: var(--color-gray-500);
}

.new-character__form-items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.new-character__form-checkbox {
  width: 50px;
  cursor: pointer;
}

.new-character__form-checkbox:checked + .new-character__form-checkbox-tile {
  background-color: gray;
}

.new-character__form-checkbox:disabled + .new-character__form-checkbox-tile {
  background-color: rgb(49, 48, 48);
}

.new-character__form-items-list-item {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 14fr;
  width: 100%;
}

.new-character__form-checkbox-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #ddd;
  background: #fff;
  box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.new-character__form-items-list-item--title {
  font-size: 15px;
  color: #555;
  padding: 5px 0px;
  transition: all 200ms ease-in-out;
}
</style>
