import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BienvenidaView from "../views/BienvenidaView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/bienvenida",
    name: "bienvenida",
    component: BienvenidaView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
