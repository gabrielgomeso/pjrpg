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

  return { user, isLoggedIn, setUser, getSession, logout };
});
