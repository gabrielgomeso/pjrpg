import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("user", () => {
  const user = ref(null);

  async function getSession() {
    try {
      if (user.value !== null) return;
      const { data } = await supabase.auth.getSession();
      console.log(data);
      if (data.session != null) setUser(data.session?.user);
    } catch (error) {
      throw new Error(`There was an error: ${error}`);
    }
  }

  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (data.session) {
        setUser(data.user);
        alert("O login foi um sucesso!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function register(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (data) {
        alert("Verifique seu email para confirmar o cadastro.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error while logging out", error);
    }
  }

  const isLoggedIn = computed(() => user.value !== null);

  function setUser(session: any) {
    user.value = session;
  }

  return { user, isLoggedIn, setUser, getSession, login, register, logout };
});
