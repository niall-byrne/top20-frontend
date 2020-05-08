// Provides State and Access to the User Reducer

import React, { useReducer, createContext } from "react";
import { UserReducer, InitialState } from "./user.reducer";

export const UserContext = createContext({ ...InitialState });

const UserProvider = ({ children }) => {
  const [userProperties, dispatch] = useReducer(UserReducer, InitialState);

  return (
    <UserContext.Provider
      value={{
        userProperties,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
