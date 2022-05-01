export const actions = {
  startGame({ commit }) {
    commit("startGame", true);
  },

  nextRound({ commit }) {
    commit("nextRound");
  },

  resetGame({ commit }) {
    commit("resetGame");
  },
};
