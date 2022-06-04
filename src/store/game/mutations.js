import { defaultState } from "./state";

export const mutations = {
  startGame(state, payload) {
    state.started = payload;
  },

  setGameId(state, payload) {
    state.id = payload;
  },

  nextRound(state) {
    state.round += 1;
  },

  // eslint-disable-next-line no-unused-vars
  resetGame(state, uid) {
    state = Object.assign(state, defaultState());
    state.id = uid;
  },

  endGame(state, payload) {
    state.ended = payload;
  },

  updateParams(state, { key, value }) {
    state.params[key] = value;
  },

  rePlay(state, uid) {
    state.started = true;
    state.ended = true;
    state.round = 0;
    state.shared = null;
    state.id = uid;
  },

  shareResults(state, id) {
    state.shared = id;
  },
};
