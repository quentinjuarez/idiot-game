import playerModule from "./players/index";
import gameModule from "./game/index";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    players: playerModule,
    game: gameModule,
  },
});

export default store;
