<script lang="ts" setup>
import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

const { setUser } = useAuthStore();
const email = ref("");
const password = ref("");

async function signIn() {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (data.session) {
      setUser(data.user);
      alert("Login successful");
    } else if (error) {
      alert(error);
    }
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
