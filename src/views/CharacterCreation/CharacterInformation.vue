<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { StepLayout } from "@/components/layout";
import * as habilities from "../../../habilities.json";

const habilitiesList = habilities.habilities;
const races: Object = {
  demigod: ["ares", "hermes"],
  spirit: ["satyr", "nynph"],
  monster: ["minotaur", "dracaena"],
};
const raceList = Object.keys(races);

const selectedRace: Ref<string> = ref("");
const selectedGroup: Ref<string> = ref("");
const groupOptions: Ref<any> = ref([]);
const groupPowers: Ref<any> = ref([]);
const formInvalid = ref(true);
const alert = ref(false);
const alertText: Ref<Array<string>> = ref([]);

interface IForm {
  name: string;
  age: string;
  group: string;
  race: string;
}

const form: Ref<IForm> = ref({
  name: "",
  age: "",
  group: "",
  race: "",
});

function setGroups(selected: string) {
  groupOptions.value = races[selected];
}

function retrievePowers(item: any, group: string) {
  if (item.group == group) {
    return {
      name: item.name,
      description: item.description,
      effect: item["1"],
    };
  }
}

function setPowers(selected: string) {
  groupPowers.value = habilitiesList.map((x) => retrievePowers(x, selected));
}

function validateSelectInput(inputValue: string, fieldName: string) {
  if (inputValue == "") {
    alert.value = true;
    alertText.value.push(`O campo de ${fieldName} deve ser selecionado.`);
  }
}

function validateNameInput(inputValue: string) {
  if (inputValue.length == 0 || /\d/.test(inputValue)) {
    alert.value = true;
    alertText.value.push(
      "O campo de nome não pode conter números e nem ser vazio."
    );
  }
}

function validateAgeInput(inputValue: string) {
  if (inputValue.length == 0 || /[a-z]/i.test(inputValue)) {
    alert.value = true;
    alertText.value.push(
      "O campo de idade só pode conter números e não pode ser vazio."
    );
  }
}

function validateForm(form: IForm) {
  formInvalid.value = true;
  alert.value = false;
  alertText.value = [];
  validateNameInput(form.name);
  validateAgeInput(form.age);
  validateSelectInput(form.race, "raça");
  validateSelectInput(form.group, "grupo");

  if (alertText.value.length == 0) {
    formInvalid.value = false;
  }
}

// OBSERVA AS RAÇAS E SETA OS GRUPOS DAQUELA RAÇA
watch(selectedRace, (newSelectedRace) => {
  setGroups(newSelectedRace);
  form.value.race = newSelectedRace;
});

// OBSERVA O GRUPO E SETA OS PODERES DAQUELE GRUPO
watch(selectedGroup, (newGroupSelected) => {
  setPowers(newGroupSelected);
  form.value.group = newGroupSelected;
});
</script>

<template>
  <StepLayout :current-step="1" :step-title="'Character Information'">
    <label class="form-label" for="character-name">
      Name:
      <input
        class="form-input"
        v-model="form.name"
        @keyup="validateForm(form)"
        type="text"
        name="character-name"
        placeholder="Insert the character's name"
      />
    </label>

    <label class="form-label" for="character-age">
      Age:
      <input
        class="form-input"
        @keyup="validateForm(form)"
        v-model="form.age"
        type="number"
        name="character-age"
        placeholder="Insert the characters age"
      />
    </label>

    <label class="form-label" for="character-race">
      Race:
      <select
        @click="validateForm(form)"
        class="form-input"
        v-model="selectedRace"
        name="character-race"
      >
        <option value="undefined" selected>Select characters race</option>
        <option v-for="race in raceList" :key="race" :value="race">
          {{ race }}
        </option>
      </select>
    </label>

    <label class="form-label" for="character-group">
      Group:
      <select
        @click="validateForm(form)"
        class="form-input"
        v-model="selectedGroup"
        name="character-group"
      >
        <option value="undefined" selected>Select characters group</option>
        <option v-for="group in groupOptions" :key="group" :value="group">
          {{ group }}
        </option>
      </select>
    </label>

    <router-link
      class="form-button"
      :class="{ 'form-button-disabled': formInvalid }"
      to="attribute_selection"
    >
      Next
    </router-link>
    <Transition>
      <div class="alert-box" v-show="alert">
        <h3>Alerta!</h3>
        <p>Os campos possuem os seguintes erros:</p>
        <ul>
          <li v-for="text in alertText" :key="text">{{ text }}</li>
        </ul>
      </div>
    </Transition>
  </StepLayout>
</template>

<style>
.alert-box {
  max-width: 350px;
  border: 1px solid red;
  border-radius: 10px;
  background-color: rgba(255, 0, 0, 0.13);
  padding: 1rem;
}

.alert-box > ul {
  list-style-type: none;
}

.alert-box > p {
  font-weight: bold;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
