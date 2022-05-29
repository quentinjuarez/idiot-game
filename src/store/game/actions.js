export const actions = {
  startGame({ commit, dispatch, state }) {
    commit("startGame", true);

    dispatch("events/startGame", state.params, { root: true });
  },

  nextRound({ commit }) {
    commit("nextRound");
  },

  resetGame({ commit }) {
    commit("resetGame");
  },

  endGame({ commit }) {
    commit("endGame", true);
  },

  updateParams({ commit }, { key, value }) {
    commit("updateParams", { key, value });
  },

  rePlay({ commit }) {
    commit("rePlay");
  },
};
