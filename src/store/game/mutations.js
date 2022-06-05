import { defaultState } from "./state";

export const mutations = {
  startGame(state, uid) {
    state = Object.assign(state, defaultState());
    state.id = uid;
    state.started = true;
  },

  nextRound(state) {
    state.round += 1;
  },

  // eslint-disable-next-line no-unused-vars
  resetGame(state) {
    state = Object.assign(state, defaultState());
  },

  endGame(state, payload) {
    state.ended = payload;
  },

  updateParams(state, { key, value }) {
    state.params[key] = value;
  },

  shareResults(state, id) {
    state.shared = id;
  },
};
