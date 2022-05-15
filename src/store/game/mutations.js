export const mutations = {
  startGame(state, payload) {
    state.started = payload;
  },

  nextRound(state) {
    state.round += 1;
  },

  resetGame(state) {
    state.started = false;
    state.params = {
      players: true,
      round: 3,
    };
    state.round = 0;
    state.ended = false;
  },

  endGame(state, payload) {
    state.ended = payload;
  },

  updateParams(state, { key, value }) {
    state.params[key] = value;
  },
};
