<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { supabase } from "@/lib/supabase";

const { isLoggedIn } = storeToRefs(useAuthStore());
const { setUser } = useAuthStore();

async function logout() {
  try {
    await supabase.auth.signOut();
    setUser(null);
  } catch (error) {
    console.log(error, "error");
  }
}
</script>
<template>
  <nav class="navigation-desktop">
    <figure>
      <img
        src="../../../assets/logo.png"
        alt="Percy Jackson and the Olympians logo"
        height="75"
      />
    </figure>
    <RouterLink class="navigation-link" to="/">Início</RouterLink>
    <RouterLink class="navigation-link" to="/roll_dice">Rolar dados</RouterLink>
    <RouterLink v-show="isLoggedIn" class="navigation-link" to="/my-profile">
      Meu perfil
    </RouterLink>
    <RouterLink class="navigation-link" to="/about">Sobre</RouterLink>
    <button v-if="isLoggedIn" @click="logout">Sair</button>
  </nav>
</template>

<style>
.navigation-desktop {
  display: none;
}

@media (min-width: 768px) {
  .navigation-desktop {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    background-color: var(--vt-c-black-mute);
    width: 100%;
    padding: 0.5rem;
    max-height: 100px;
  }
}
</style>
