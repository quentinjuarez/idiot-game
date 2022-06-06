export const defaultState = () => ({
  players: [],
  me: {
    id: null,
    name: "",
    actions: [[], [], []],
    score: 0,
    maxScore: [0, 0, 0],
    failed: false,
    played: false,
  },
});
