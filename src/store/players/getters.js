export const getters = {
  allPlayers(state) {
    return state.players;
  },
  lastPlayer(state) {
    return state.players.find((player) => !player.played);
  },
  playerById(state) {
    return (id) => {
      return state.players.find((u) => u.id == id);
    };
  },
};
