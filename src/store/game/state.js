export const defaultState = () => {
  return {
    id: null,
    started: false,
    params: {
      round: 3,
      players: true,
    },
    round: 0,
    ended: false,
    shared: null,
  };
};
