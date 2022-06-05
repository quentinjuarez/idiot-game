export const actions = {
  game({ rootState }, type) {
    try {
      const { params, id } = rootState.game;
      const { players } = rootState.players;

      this.$services.events.create({
        type: "game." + type,
        meta: { id, params, players: players.length },
      });
    } catch (err) {
      return err;
    }
  },
};
