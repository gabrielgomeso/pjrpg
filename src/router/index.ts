import { createRouter, createWebHistory } from "vue-router";
import { scrollToTop } from "@/assets/ts/utils";
import HomeView from "../views/HomeView.vue";
import {
  NewCharacter,
  PreviewCharacter,
  CharacterSheet,
} from "@/views/Characters";
import { AdminView } from "@/views/Admin";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { getSession, isLoggedIn } = useAuthStore();

  try {
    await getSession();
    if (isLoggedIn) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    throw new Error(`There was an error while getting the session: ${error}`);
  }
};

const checkSession = async () => {
  const { getSession } = useAuthStore();

  try {
    await getSession();
  } catch (error) {
    throw new Error(`There was an error while getting the session: ${error}`);
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: checkSession,
    component: HomeView,
  },
  {
    path: "/characters",
    name: "characters",
    children: [
      {
        path: "new",
        name: "new_character",
        beforeEnter: authGuard,
        component: NewCharacter,
      },
      {
        path: "preview",
        name: "preview_character",
        component: PreviewCharacter,
      },
      {
        path: ":id",
        name: "character",
        beforeEnter: checkSession,
        component: CharacterSheet,
      },
    ],
  },
  {
    path: "/roll_dice",
    name: "dice",
    component: () => import("../views/RollDice.vue"),
  },
  {
    path: "/my-profile",
    name: "profile",
    beforeEnter: authGuard,
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/timeline",
    name: "timeline",
    beforeEnter: checkSession,
    component: () => import("../views/TimelineView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    beforeEnter: checkSession,
    children: [
      {
        path: "",
        name: "admin",
        component: AdminView,
      },
      {
        path: "characters_panel",
        name: "characters_panel",
        component: () =>
          import("../views/Admin/Characters/CharactersPanel.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  scrollToTop();
});

export default router;
