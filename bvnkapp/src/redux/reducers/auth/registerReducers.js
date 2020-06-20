export const register = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }
    default: {
      return state;
    }
  }
};
