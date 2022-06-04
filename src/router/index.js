import { createRouter, createWebHistory } from "@ionic/vue-router";
import Game from "../pages/Game.vue";
import New from "../pages/New.vue";
import Results from "../pages/Results.vue";
import Players from "../pages/Players.vue";
import Share from "../pages/Share.vue";

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
    path: "/results",
    component: Results,
  },
  {
    path: "/players",
    component: Players,
  },
  {
    path: "/share/:id",
    component: Share,
  },
  {
    path: "/:path(.*)*",
    redirect: "/new",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
