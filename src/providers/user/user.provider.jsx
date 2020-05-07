// Provides State and Access to the User Reducer

import React, { useReducer, useState, createContext } from "react";
import { UserReducer, InitialState } from "./user.reducer";

export const UserContext = createContext({ ...InitialState, userName: "" });

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userProperties, dispatch] = useReducer(UserReducer, InitialState);

  return (
    <UserContext.Provider
      value={{
        userProperties,
        dispatch,
        setUserName,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
