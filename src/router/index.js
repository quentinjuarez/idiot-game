import { createRouter, createWebHistory } from "@ionic/vue-router";
import Game from "../pages/Game.vue";
import New from "../pages/New.vue";

const routes = [
  {
    path: "/",
    redirect: "/new",
  },
  {
    path: "/new",
    component: New,
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/:path(.*)*",
    redirect: "/new",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
