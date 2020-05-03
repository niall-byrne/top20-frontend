import React from "react";
import CurrentUserContext from "../../contexts/user/user.context";
import { Navbar, NavbarItems } from "./header.styles";

const Header = () => {
  const user = React.useContext(CurrentUserContext);
  console.log(user);
  if (user.userName === null) {
    return (
      <Navbar>
        <NavbarItems>
          <a rel="noopener noreferrer" target="_blank" href="https://last.fm">
            <img alt="last.fm" src="./images/lastfm.png" />
          </a>
        </NavbarItems>
        <NavbarItems>Specify your last.fm username</NavbarItems>
      </Navbar>
    );
  } else {
    return (
      <Navbar>
        <NavbarItems>
          <img alt="Avatar" src={user.imgUrl} />
        </NavbarItems>
        <NavbarItems>{user.userName}</NavbarItems>
      </Navbar>
    );
  }
};

export default Header;
