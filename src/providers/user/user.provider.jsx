import React, { createContext, useState } from "react";

export const UserContext = createContext({
  userName: "",
  imageUrl: null,
  profileUrl: null,
  ready: false,
});

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [ready, setReady] = useState(false);

  const toggleReady = () => setReady(!ready);

  return (
    <UserContext.Provider
      value={{
        toggleReady,
        ready,
        userName,
        setUserName,
        imageUrl,
        setImageUrl,
        profileUrl,
        setProfileUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
