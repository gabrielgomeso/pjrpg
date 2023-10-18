import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import type { IUser } from "@/data/models";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("user", () => {
  const router = useRouter();

  const user = ref<IUser>({
    id: "",
    created_at: "",
    email: "",
    username: "",
    role: "user",
  });

  async function getSession() {
    try {
      if (user.value.id) return;
      const { data } = await supabase.auth.getSession();

      if (data.session?.user.email && data.session?.user.email) {
        const fetchedUser = await getUser(data.session?.user.email);
        if (fetchedUser) {
          user.value = fetchedUser;
        }
      }
    } catch (error) {
      throw new Error(`There was an error: ${error}`);
    }
  }

  async function getUser(email: string) {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (users) {
        return users[0];
      }

      if (error) throw new Error(error.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user && data.user.email) {
        const fetchedUser = await getUser(data.user.email);
        if (fetchedUser) {
          user.value = fetchedUser;
        }
      }

      if (error) throw new Error(error.message);
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

      console.log('logout');

      user.value = {
        id: "",
        created_at: "",
        email: "",
        username: "",
        role: "user",
      };

      router.push("/");
    } catch (error) {
      console.log("error while logging out", error);
    }
  }

  const isLoggedIn = computed(() => user.value.id);

  return {
    user,
    getUser,
    getSession,
    login,
    register,
    logout,
    isLoggedIn,
  };
});
