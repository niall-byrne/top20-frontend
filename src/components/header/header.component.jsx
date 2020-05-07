import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { Navbar, NavbarFixed, NavbarItems } from "./header.styles";
import { withRouter } from "react-router-dom";

export const fallBackAvatar = "./images/lastfm.png";

const Header = ({ match }) => {
  const { userProperties, userName } = React.useContext(UserContext);

  if (!userProperties.ready) {
    return (
      <NavbarFixed>
        <Navbar>
          <NavbarItems>
            <a rel="noopener noreferrer" target="_blank" href="https://last.fm">
              <img alt="last.fm" src={fallBackAvatar} />
            </a>
          </NavbarItems>
          <NavbarItems>
            {userProperties.error
              ? "No User Found"
              : match.isExact
              ? "Specify your last.fm username"
              : "Loading ..."}
          </NavbarItems>
        </Navbar>
      </NavbarFixed>
    );
  } else {
    return (
      <NavbarFixed>
        <Navbar>
          <NavbarItems>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={userProperties.profileUrl}
            >
              <img
                alt="Avatar"
                src={
                  userProperties.imageUrl !== ""
                    ? userProperties.imageUrl
                    : fallBackAvatar
                }
              />
            </a>
          </NavbarItems>
          <NavbarItems>{userName}</NavbarItems>
        </Navbar>
      </NavbarFixed>
    );
  }
};

export default withRouter(Header);
