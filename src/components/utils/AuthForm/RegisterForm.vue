<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { register } = useAuthStore();
const email = ref("");
const email_confirmation = ref("");
const password = ref("");

async function signUp() {
  try {
    await register(email.value, password.value);
  } catch (error) {
    alert(error);
  }
}
</script>

<template>
  <form class="register-form">
    <label class="form-label" for="email">
      <span class="form-label__text"> E-mail: </span>
      <input
        class="form-input"
        v-model="email"
        type="email"
        name="email"
        id="email"
      />
    </label>
    <label class="form-label" for="email_confirmation">
      <span class="form-label__text"> Confirmação do e-mail: </span>
      <input
        class="form-input"
        v-model="email_confirmation"
        type="email"
        name="email_confirmation"
        id="email_confirmation"
      />
    </label>
    <label class="form-label" for="password">
      <span class="form-label__text"> Senha: </span>
      <input
        class="form-input"
        v-model="password"
        type="password"
        name="password"
        id="password"
      />
    </label>

    <button @click="signUp()" class="form-button" type="button">
      Registrar
    </button>
  </form>
</template>

<style>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
}
</style>
