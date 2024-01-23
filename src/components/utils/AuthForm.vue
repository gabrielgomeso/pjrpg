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
    <div v-if="toggleAuthForm">
      <LoginForm />
    </div>
    <div v-else>
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
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  color: #fff;
  border-bottom: 2px solid #1a1717c0;
  background-color: #27272785;
  cursor: pointer;
  padding: 15px;
  width: 100%;
  height: 100%;
}

.auth-form__header--selected {
  color: #dddddd;
  border-bottom: 2px solid #1a1717c0;
  background-color: #7e7d7d85;
}

.auth-form__container {
  display: flex;
  flex-direction: column;
  min-width: 80%;
  gap: 15px;
  min-height: 450px;
  padding: 1rem;
  background-color: #272727d8;
  height: 100%;
}

@media (min-width: 768px) {
  .auth-form__container {
    width: 50%;
  }
}
</style>
