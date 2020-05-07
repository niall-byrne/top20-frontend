import UserActions from "./user.actions";
import withReducerLogger from "../../util/reducer.logger";

const withMiddleware = (reducer, name) => {
  const dispatch = withReducerLogger(reducer, name);
  const wrappedReducer = (state, action) => {
    switch (action.type) {
      case UserActions.StartFetchUser:
        action.func(dispatch, state, action.payload);
        return dispatch(state, action);
      default:
        return dispatch(state, action);
    }
  };
  return wrappedReducer;
};

export default withMiddleware;
