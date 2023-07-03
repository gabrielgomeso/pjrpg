import { RouterView, useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/lib/supabase";
import { storeToRefs } from "pinia";

export function useAuth() {
  const userStore = useAuthStore();
  const { user, setUser } = userStore;

  const { isLoggedIn } = storeToRefs(userStore);

  const router = useRouter();
  const route = useRoute();

  const validateEmail = (str: string) => {
    if (!str) return false;
    const pattern =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(str);
  };

  return {
    isLoggedIn,
    route,
    router,
    RouterView,
    setUser,
    supabase,
    useRouter,
    user,
    validateEmail,
  };
}
