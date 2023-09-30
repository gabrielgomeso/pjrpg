<script setup lang="ts">
import { ref } from "vue";
import { LoginForm, RegisterForm } from "@/components/utils/AuthForm";

const toggleAuthForm = ref(true);
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
        Entrar
      </button>
      <button
        @click="toggleAuthForm = !toggleAuthForm"
        :disabled="!toggleAuthForm"
        class="auth-form__header-button"
        :class="{ 'auth-form__header--selected': !toggleAuthForm }"
      >
        Registrar
      </button>
    </div>
    <div v-if="toggleAuthForm" class="auth-form__body">
      <LoginForm />
    </div>
    <div v-else class="auth-form__body">
      <RegisterForm />
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
