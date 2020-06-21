export const login = (state = { userRole: "admin" }, action) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }

    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload };
    }
    default: {
      return state;
    }
  }
};
