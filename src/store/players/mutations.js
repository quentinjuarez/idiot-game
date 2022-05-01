export const mutations = {
  saveallPlayers(state, payload) {
    state.users = payload;
  },
  addPlayer(state, payload) {
    state.users.push(payload);
  },
  updateName(state, payload) {
    const { id, name } = payload;
    const index = state.users.findIndex((u) => u.id === id);
    state.users[index].name = name;
  },

  updateScore(state, payload) {
    const { id, score, failed, round } = payload;
    const index = state.users.findIndex((u) => u.id === id);
    if (failed) {
      state.users[index].maxScore[round] = 0;
      return (state.users[index].score = 0);
    }
    let newScore = state.users[index].score + score;
    if (state.users[index].maxScore[round] < newScore) {
      state.users[index].maxScore[round] = newScore;
    }
    state.users[index].score = newScore;
  },

  hasPlayed(state, id) {
    const index = state.users.findIndex((u) => u.id === id);
    state.users[index].played = true;
  },

  resetPlayersScore(state) {
    const toResetPlayers = state.users.map((u) => {
      return { ...u, played: false, score: 0 };
    });

    state.users = toResetPlayers;
  },

  deleteUser(state, id) {
    state.users = state.users.filter((u) => u.id !== id);
  },

  resetPlayers(state) {
    state.users = [];
  },
};
