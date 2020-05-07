// Intercepts Certain Reducer Actions to Call Asyncronous Logic
// Encapsulates with logging

import UserActions from "./user.actions";
import withReducerLogger from "../../util/reducer.logger";

const withMiddleware = (originalReducer, name) => {
  const reducer = withReducerLogger(originalReducer, name);
  const wrappedReducer = (state, action) => {
    switch (action.type) {
      case UserActions.StartFetchUser:
        action.func(state, action);
        return reducer(state, action);
      default:
        return reducer(state, action);
    }
  };
  return wrappedReducer;
};

export default withMiddleware;
