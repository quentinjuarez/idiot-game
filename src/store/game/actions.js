import { uid, partyCode } from "../utils";

export const actions = {
  startGame({ commit, dispatch }) {
    commit("startGame", uid());
    dispatch("events/game", "start", { root: true });
  },

  nextRound({ commit }) {
    commit("nextRound");
  },

  resetGame({ commit, dispatch }, abort = false) {
    if (abort) {
      dispatch("events/game", "abort", { root: true });
    }

    commit("resetGame");
  },

  endGame({ commit, dispatch }) {
    commit("endGame", true);

    dispatch("events/game", "end", { root: true });
  },

  updateParams({ commit }, { key, value }) {
    commit("updateParams", { key, value });
  },

  // SHARE

  async shareResults({ commit, rootState, dispatch }) {
    const { game, players: playersModule } = rootState;
    const { players } = playersModule;
    try {
      const { data } = await this.$services.share.create({ game, players });

      commit("shareResults", data._id);
      dispatch("events/game", "share", { root: true });
      return data._id;
    } catch (err) {
      return err;
    }
  },

  async getResults(_, id) {
    try {
      const { data } = await this.$services.share.get(id);
      return { success: true, data };
    } catch (err) {
      return { success: false, data: err };
    }
  },

  // PARTY
  async initParty({ commit }) {
    commit("initParty", uid());
  },

  async createParty({ commit, state }, name) {
    try {
      commit("createParty", { name, code: partyCode() });
      const { data } = await this.$services.party.create(state);

      return { success: true, data };
    } catch (err) {
      return { success: false, data: err };
    }
  },

  async joinParty({ commit }, { code, user }) {
    try {
      const { data } = await this.$services.party.join(code, user);

      commit("joinParty", data);
      return { success: true, data };
    } catch (err) {
      return { success: false, data: err };
    }
  },
};
