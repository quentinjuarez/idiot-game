export const defaultState = () => {
  return {
    id: null,
    started: false,
    params: {
      round: 3,
      players: true,
      party: false,
    },
    round: 0,
    ended: false,
    shared: null,
    name: null,
    code: null,
  };
};
