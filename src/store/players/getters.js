export const getters = {
  allPlayers(state) {
    return state.users;
  },
  lastPlayer(state) {
    return state.users.find((user) => !user.played);
  },
  userById(state) {
    return (id) => {
      return state.users.find((u) => u.id == id);
    };
  },
};
