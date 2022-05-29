import { defaultState } from "./state";

export const mutations = {
  startGame(state, payload) {
    state.started = payload;
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

  rePlay(state) {
    state.started = true;
    state.ended = true;
    state.round = 0;
  },
};
