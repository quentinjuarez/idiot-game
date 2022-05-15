export const mutations = {
  saveallPlayers(state, payload) {
    state.players = payload;
  },
  addPlayer(state, payload) {
    state.players.push(payload);
  },
  updateName(state, payload) {
    const { id, name } = payload;
    const index = state.players.findIndex((u) => u.id === id);
    state.players[index].name = name;
  },

  updateScore(state, payload) {
    const { id, score, failed, round } = payload;
    const index = state.players.findIndex((u) => u.id === id);
    if (failed) {
      state.players[index].maxScore[round] = 0;
      return (state.players[index].score = 0);
    }
    let newScore = state.players[index].score + score;
    if (state.players[index].maxScore[round] < newScore) {
      state.players[index].maxScore[round] = newScore;
    }
    state.players[index].score = newScore;
  },

  hasPlayed(state, id) {
    const index = state.players.findIndex((u) => u.id === id);
    state.players[index].played = true;
  },

  resetPlayersScore(state) {
    const toResetPlayers = state.players.map((u) => {
      return { ...u, played: false, score: 0 };
    });

    state.players = toResetPlayers;
  },

  deletePlayer(state, id) {
    state.players = state.players.filter((u) => u.id !== id);
  },

  resetPlayers(state) {
    state.players = [];
  },
};
