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
  <label class="form-label" for="email">
    E-mail:
    <input
      class="form-input"
      v-model="email"
      type="email"
      name="email"
      id="email"
    />
  </label>
  <label class="form-label" for="password">
    Password:
    <input
      class="form-input"
      v-model="password"
      type="password"
      name="password"
      id="password"
    />
  </label>
  <button class="form-button" type="button" @click="signIn">Login</button>
</template>
