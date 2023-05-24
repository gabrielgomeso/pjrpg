import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const loggedUser: any = ref(null);

  const isAuthenticated = loggedUser.value != null ? true : false;

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
      throw new Error("Login Failed. Error - " + err);
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      loggedUser.value = null;
      if (error) throw error;
    } catch (err) {
      throw new Error("Logout Failed. Error - " + err);
    }
  }

  async function getUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      loggedUser.value = user;
    } catch (err) {
      loggedUser.value = null;
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
