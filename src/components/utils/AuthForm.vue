<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

const { setUser } = useAuthStore();
const toggleAuthForm = ref(true);
const email = ref("");
const email_confirmation = ref("");
const password = ref("");
// const errorMessage = ref("");

async function signIn() {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (data) {
    setUser(data);
    alert("Login successful");
  } else if (error) {
    alert("Login failed");
  }
}
</script>
<template>
  <div class="auth-form__container">
    <div class="auth-form__header">
      <button
        @click="toggleAuthForm = !toggleAuthForm"
        :disabled="toggleAuthForm"
        class="auth-form__header-button"
        :class="{ 'auth-form__header--selected': toggleAuthForm }"
      >
        Login
      </button>
      <button
        @click="toggleAuthForm = !toggleAuthForm"
        :disabled="!toggleAuthForm"
        class="auth-form__header-button"
        :class="{ 'auth-form__header--selected': !toggleAuthForm }"
      >
        Register
      </button>
    </div>
    <div v-if="toggleAuthForm" class="auth-form__body">
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
    </div>
    <div v-else class="auth-form__body">
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

      <button class="form-button" type="button">Register</button>
    </div>
  </div>
</template>
<style>
.auth-form__header {
  display: flex;
  justify-content: space-around;
}

.auth-form__header-button {
  background-color: transparent;
  font-size: large;
  border: none;
  color: #fff;
}

.auth-form__header > h2 {
  cursor: pointer;
}

.auth-form__header--selected {
  color: #a78787;
  border-bottom: 2px solid #fff;
  background-color: #272727;
}

.auth-form__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 15px;
  min-height: 300px;
  padding: 1rem;
  border-radius: 15px;
  background-color: #272727;
}

.auth-form__body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (min-width: 768px) {
  .auth-form__container {
    width: 50%;
  }
}
</style>
