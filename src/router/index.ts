import { createRouter, createWebHistory } from "vue-router";
import { scrollToTop } from "@/assets/ts/utils";
import HomeView from "../views/HomeView.vue";
import {
  AttributeSelection,
  CharacterRace,
  CharacterGroup,
  HabilitiesSelection,
  FeatsSelection,
  ItemsSelection,
  CharacterOverview,
  CharacterInformation,
} from "@/views/CharacterCreation";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    next("/auth/login");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/character_creation",
    name: "character_creation",
    redirect: { name: "character_race" },
    beforeEnter: authGuard,
    children: [
      {
        path: "/character_race",
        name: "character_race",
        component: CharacterRace,
      },
      {
        path: "/character_group",
        name: "character_group",
        component: CharacterGroup,
      },
      {
        path: "/attribute_selection",
        name: "attribute_selection",
        component: AttributeSelection,
      },
      {
        path: "/items_selection",
        name: "items_selection",
        component: ItemsSelection,
      },
      {
        path: "/character_information",
        name: "character_information",
        component: CharacterInformation,
      },
      {
        path: "/character_overview",
        name: "character_overview",
        component: CharacterOverview,
      },
      {
        path: "/habilities_selection",
        name: "habilities_selection",
        component: HabilitiesSelection,
      },
      {
        path: "/feats_selection",
        name: "feats_selection",
        component: FeatsSelection,
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
    component: () => import("../views/ProfileView.vue"),
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
