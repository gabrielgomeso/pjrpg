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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
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
