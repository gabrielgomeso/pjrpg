<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import AuthForm from "../components/utils/AuthForm.vue";
import WelcomeDisplay from "../components/HomeView/WelcomeDisplay.vue";

const { isLoggedIn, user, setUser, supabase, router } = useAuth();

const state = reactive({
  loading: false,
});

onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    state.loading = true;
    if (!session) {
      router.push("/");
    } else {
      setUser(session ? session.user : null);
      router.forward();
    }
    state.loading = false;
  });
});
</script>

<template>
  <main>
    <div class="home-view">
      <h1 class="home-view__title">Herdeiros do Olímpo</h1>
      <div class="home-view__auth">
        <AuthForm v-if="!isLoggedIn" />
        <WelcomeDisplay v-else />
      </div>
    </div>
  </main>
</template>
<style>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url("../assets/images/first-fold.jpg") no-repeat center / cover;
}

.home-view__title {
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: white;
  text-shadow: 0 0 10px black;
  animation: fade-in 1s ease-out forwards;
  margin-block-start: 3rem;
  margin-block-end: 1rem;
}

.home-view__auth {
  display: flex;
  justify-content: center;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .home-view {
    height: calc(100vh - 100px);
  }
}
</style>
