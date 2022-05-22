import { uid } from "./utils";

export const actions = {
  nextPlayer({ commit }) {
    commit("addPlayer", {
      id: uid(),
      name: "",
      actions: [[], [], []],
      score: 0,
      maxScore: [0, 0, 0],
      failed: false,
      played: false,
    });
  },

  newPlayer({ commit }, name) {
    commit("addPlayer", {
      id: uid(),
      name: name,
      actions: [[], [], []],
      score: 0,
      maxScore: [0, 0, 0],
      failed: false,
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

  resetPlayersAllScores({ commit }) {
    commit("resetPlayersAllScores");
  },

  updatePlayer({ commit }, payload) {
    commit("updatePlayer", payload);
  },

  resetPlayers({ commit }) {
    commit("resetPlayers");
  },

  deletePlayer({ commit }, id) {
    commit("deletePlayer", id);
  },
};
