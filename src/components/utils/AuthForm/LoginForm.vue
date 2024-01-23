<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { login } = useAuthStore();
const email = ref("");
const password = ref("");

async function signIn() {
  try {
    await login(email.value, password.value);
  } catch (error) {
    alert(error);
  }
}
</script>

<template>
  <form class="login-form">
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
    <button class="form-button" type="button" @click="signIn">Entrar</button>
  </form>
</template>

<style>
.form-label__text {
  color: white;
}

.login-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  height: 100%;
}
</style>
