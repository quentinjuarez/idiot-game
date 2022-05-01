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
      round: 3,
    };
    state.round = 0;
  },
};
