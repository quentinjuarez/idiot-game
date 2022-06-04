import { uid } from "../utils";

export const actions = {
  startGame({ commit, dispatch, state }) {
    commit("startGame", true);
    commit("setGameId", uid());

    dispatch("events/startGame", state.params, { root: true });
  },

  nextRound({ commit }) {
    commit("nextRound");
  },

  resetGame({ commit }) {
    commit("resetGame", uid());
  },

  endGame({ commit }) {
    commit("endGame", true);
  },

  updateParams({ commit }, { key, value }) {
    commit("updateParams", { key, value });
  },

  rePlay({ commit }) {
    commit("rePlay", uid());
  },

  async shareResults({ commit, rootState }) {
    const { game, players: playersModule } = rootState;
    const { players } = playersModule;
    try {
      const { data } = await this.$services.share.create({ game, players });
      commit("shareResults", data._id);
      return data._id;
    } catch (err) {
      return err;
    }
  },

  async getResults(_, id) {
    try {
      const { data } = await this.$services.share.get(id);
      return data;
    } catch (err) {
      return err;
    }
  },
};
