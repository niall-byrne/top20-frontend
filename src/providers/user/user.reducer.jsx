import UserActions from "./user.actions";
import withReducerLogger from "../../util/reducer.logger";

export const InitialState = {
  imageUrl: null,
  profileUrl: null,
  ready: false,
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

export const UserReducer = withReducerLogger(reducer, "UserReducer");
