import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/Gallery.vue"),
  },
  {
    path: "/filter",
    name: "Filter",
    component: () => import("../views/Filter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/basketVUE-Frontend-VUE/"), // <-- Aquí pones la base
  routes,
});

export default router;
