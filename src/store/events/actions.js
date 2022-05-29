export const actions = {
  startGame(_, params) {
    try {
      this.$services.events.create({ type: "game.start", meta: { params } });
    } catch (err) {
      return err;
    }
  },
};
