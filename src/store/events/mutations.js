import { defaultState } from "./state";

export const mutations = {
  // eslint-disable-next-line no-unused-vars
  reset(state) {
    state = Object.assign(state, defaultState());
  },
};
