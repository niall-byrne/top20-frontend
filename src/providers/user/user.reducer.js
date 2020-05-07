// Main User Reducer
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
    case UserActions.FailureFetchUser:
      return {
        ...state,
        error: true,
      };
    case UserActions.SuccessFetchUser:
      return {
        ...state,
        profileUrl: `https://www.last.fm/user/${action.userName}`,
        imageUrl: action.data.image,
        data: action.data,
        error: false,
        ready: true,
      };
    default:
      return state;
  }
};

export const UserReducer = withMiddleware(reducer, "UserReducer");
