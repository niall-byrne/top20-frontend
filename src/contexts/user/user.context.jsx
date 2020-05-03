import { createContext } from "react";
const CurrentUserContext = createContext({
  userName: "niall-byrne",
  imgUrl:
    "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
  profileUrl: "https://www.last.fm/user/niall-byrne",
});

export default CurrentUserContext;
