import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const loggedUser: any = ref(undefined);

  const isAuthenticated = () => Boolean(loggedUser.value);

  async function register(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (data) {
        return data;
      }

      if (error) throw error;
    } catch (err) {
      console.error("Unknown error while registering", err);
    }
  }

  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data.user != null) {
        loggedUser.value = data;
      }

      if (error) throw error;
    } catch (err) {
      console.error("Unknown error while loging in", err);
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      console.log("logged out!");
      loggedUser.value = null;
      if (error) throw error;
    } catch (err) {
      console.error("Unknown error while logging out", err);
    }
  }

  async function getUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      loggedUser.value = user;
      console.log("logged user:", user);
    } catch (err) {
      console.error("Unknown error while getting user", err);
    }
  }

  return {
    login,
    register,
    logout,
    getUser,
    loggedUser,
    isAuthenticated,
  };
});
