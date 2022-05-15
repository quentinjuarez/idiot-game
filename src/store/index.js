import playerModule from "./players/index";
import gameModule from "./game/index";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    players: playerModule,
    game: gameModule,
  },
  plugins: [createPersistedState()],
});

export default store;
