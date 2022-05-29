export const actions = {
  create() {
    try {
      this.$services.events.create({ name: "test" });
    } catch (err) {
      return err;
    }
  },
};
