export const getters = {
  started(state) {
    return state.started;
  },

  round(state) {
    return state.round;
  },

  params(state) {
    return state.params;
  },

  ended(state) {
    return state.ended;
  },

  shared(state) {
    return state.shared;
  },

  // PARTY
  isParty(state) {
    return state.params.party;
  },

  partyName(state) {
    return state.name;
  },

  partyCode(state) {
    return state.code;
  },
};
