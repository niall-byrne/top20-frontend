// Main User Reducer
import UserActions from "./user.actions";
import withMiddleware from "../../util/user.middleware";
import reducerLoggingMiddleware from "../../util/reducer.logger";
import { GenerateUserLink } from "../../configuration/lastfm";

export const InitialState = {
  userName: "",
  data: null,
  imageUrl: null,
  profileUrl: null,
  ready: false,
  error: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case UserActions.ToggleError:
      return {
        ...state,
        error: !state.error,
      };
    case UserActions.ToggleReady:
      return {
        ...state,
        ready: !state.ready,
      };
    case UserActions.StartFetchUser:
      action.func(state, action);
      return state;
    case UserActions.FailureFetchUser:
      return {
        ...state,
        userName: action.userName,
        profileUrl: null,
        imageUrl: null,
        data: null,
        error: true,
        ready: false,
      };
    case UserActions.SuccessFetchUser:
      return {
        userName: action.userName,
        profileUrl: GenerateUserLink(action.userName),
        imageUrl: action.data.image,
        data: action.data,
        error: false,
        ready: true,
      };
    default:
      return state;
  }
};

const middlewares = [reducerLoggingMiddleware];
export const UserReducer = withMiddleware(userReducer, middlewares);
