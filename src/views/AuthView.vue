<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const param = route.params.param;
const { getUser, register, login } = useAuthStore();
const { loggedUser } = storeToRefs(useAuthStore());

const email = ref("");
const email_confirmation = ref("");
const password = ref("");
const errorMessage = ref("");

// Define reactive variables

// Define the sendLoginForm function
const sendLoginForm = async () => {
  try {
    // Call the login action from the auth store
    await login(email.value, password.value);

    // If login is successful, redirect to /my-profile
    if (loggedUser.value != null) {
      router.push("/my-profile");
    }
  } catch (error: any) {
    // If there's an error, display the error message
    errorMessage.value = error.message;
  }
};

onBeforeMount(() => {
  if (loggedUser.value == null) {
    getUser();
  } else {
    router.push("/my-profile");
  }
});
</script>

<template>
  <main class="container full-height">
    <div>
      <div v-if="loggedUser == null && param == 'login'">
        <h2>Login</h2>
        <label for="email">
          E-mail:
          <input v-model="email" type="email" name="email" id="email" />
        </label>
        <label for="password">
          Password:
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
          />
        </label>

        <button type="button" @click="sendLoginForm()">Login</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      <div v-else-if="loggedUser == null && param == 'register'">
        <h2>Register</h2>
        <label for="email">
          E-mail:
          <input v-model="email" type="email" name="email" id="email" />
        </label>
        <label for="email_confirmation">
          E-mail confirmation:
          <input
            v-model="email_confirmation"
            type="email"
            name="email_confirmation"
            id="email_confirmation"
          />
        </label>
        <label for="password">
          Password:
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
          />
        </label>

        <button type="button" @click="register(email, password)">
          Register
        </button>
      </div>
    </div>
  </main>
</template>
<style>
.auth-container {
  display: flex;
  flex-direction: column;
}
</style>
