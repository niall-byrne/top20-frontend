import UserActions from "./user.actions";
import withMiddleware from "./user.middleware";

export const InitialState = {
  data: null,
  imageUrl: null,
  profileUrl: null,
  ready: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UserActions.ToggleReady:
      return {
        ...state,
        ready: !state.ready,
      };
    default:
      return state;
  }
};

export const UserReducer = withMiddleware(reducer, "UserReducer");
