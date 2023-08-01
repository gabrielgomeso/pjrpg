<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { supabase } from "@/lib/supabase";

const { isLoggedIn } = storeToRefs(useAuthStore());
const { setUser } = useAuthStore();

async function logout() {
  let { error } = await supabase.auth.signOut();
  setUser(null);

  if (error) {
    console.log(error);
  }
}
</script>
<template>
  <header>
    <nav class="navigation">
      <figure>
        <img
          class="navigation-logo"
          src="../../assets/logo.png"
          alt="Percy Jackson and the Olympians logo"
          height="75"
        />
      </figure>
      <RouterLink class="navigation-link" to="/">Home</RouterLink>
      <RouterLink class="navigation-link" to="/roll_dice">
        Roll Dice
      </RouterLink>
      <RouterLink v-show="isLoggedIn" class="navigation-link" to="/my-profile">
        My Profile
      </RouterLink>
      <RouterLink class="navigation-link" to="/about">About</RouterLink>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
  </header>
</template>
<style>
.navigation {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  background-color: var(--vt-c-black-mute);
  width: 100vw;
  bottom: 0;
  padding: 15px;
  z-index: 1000;
  font-size: clamp(0.5rem, 1vw, 0.75rem);
}

.navigation-logo {
  display: none;
}

@media (min-width: 768px) {
  .navigation {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    background-color: var(--vt-c-black-mute);
    width: 100%;
    padding: 0.5rem;
    z-index: 1000;
    max-height: 100px;
  }

  .navigation-logo {
    display: block;
  }
}

.navigation a {
  border: 1px solid white;
}

.navigation-link {
  text-decoration: none;
  color: rgb(218, 143, 4);
  font-weight: 900;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;
  transition: transform 0.2s ease-in-out;
  text-align: center;
  padding: 0.5rem;
}

.navigation-link:hover {
  transform: scale(1.1);
}
</style>
