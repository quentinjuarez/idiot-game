export const actions = {
  nextPlayer({ commit, state }) {
    commit("addPlayer", {
      id: state.users.length + 1,
      name: "",
      actions: [],
      score: 0,
      maxScore: [0, 0, 0],
      played: false,
    });
  },

  updateName({ commit }, payload) {
    commit("updateName", payload);
  },

  updateScore({ commit }, payload) {
    commit("updateScore", payload);
  },

  hasPlayed({ commit }, id) {
    commit("hasPlayed", id);
  },

  resetPlayersScore({ commit }) {
    commit("resetPlayersScore");
  },

  updateUser({ commit }, payload) {
    commit("updateUser", payload);
  },

  resetPlayers({ commit }) {
    commit("resetPlayers");
  },

  deleteUser({ commit }, id) {
    commit("deleteUser", id);
  },
};
