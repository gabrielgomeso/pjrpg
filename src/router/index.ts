import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import {
  AttributeSelection,
  CharacterInformation,
  HabilitiesSelection,
  ItemsSelection,
} from "@/views/CharacterCreation";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/character_creation",
      name: "character_creation",
      component: CharacterInformation,
    },
    {
      path: "/attribute_selection",
      name: "attribute_selection",
      component: AttributeSelection,
    },
    {
      path: "/habilities_selection",
      name: "habilities_selection",
      component: HabilitiesSelection,
    },
    {
      path: "/items_selection",
      name: "items_selection",
      component: ItemsSelection,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
