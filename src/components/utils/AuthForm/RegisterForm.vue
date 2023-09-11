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
  <label class="form-label" for="email_confirmation">
    E-mail confirmation:
    <input
      class="form-input"
      v-model="email_confirmation"
      type="email"
      name="email_confirmation"
      id="email_confirmation"
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

  <button @click="signUp()" class="form-button" type="button">Register</button>
</template>
