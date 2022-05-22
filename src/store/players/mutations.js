import { defaultState } from "./state";

export const mutations = {
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

    state.players[index].actions[round].push(score);

    if (failed) {
      state.players[index].failed = true;
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
      return { ...u, played: false, failed: false, score: 0 };
    });

    state.players = toResetPlayers;
  },

  resetPlayersAllScores(state) {
    const toResetPlayers = state.players.map((u) => {
      return {
        ...u,
        played: false,
        score: 0,
        failed: false,
        maxScore: [0, 0, 0],
        actions: [[], [], []],
      };
    });

    state.players = toResetPlayers;
  },

  deletePlayer(state, id) {
    state.players = state.players.filter((u) => u.id !== id);
  },

  // eslint-disable-next-line no-unused-vars
  resetPlayers(state) {
    state = Object.assign(state, defaultState());
  },
};
