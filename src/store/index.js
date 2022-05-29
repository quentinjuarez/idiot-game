import playersModule from "./players/index";
import gameModule from "./game/index";
import eventsModule from "./events/index";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    players: playersModule,
    game: gameModule,
    events: eventsModule,
  },
  plugins: [createPersistedState()],
});

export default store;
