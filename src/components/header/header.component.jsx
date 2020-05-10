import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { Navbar, NavbarFixed, NavbarItems } from "./header.styles";
import { withRouter } from "react-router-dom";

export const fallBackAvatar = "./images/lastfm.png";

export const messages = {
  noUser: "No User Found",
  promptUser: "Specify your last.fm username",
  loadingUser: "Loading ...",
  altLastFM: "last.fm",
  altAvatar: "Avatar",
};

const Header = ({ match }) => {
  const { userProperties } = React.useContext(UserContext);

  if (!userProperties.ready) {
    return (
      <NavbarFixed>
        <Navbar>
          <NavbarItems>
            <a rel="noopener noreferrer" target="_blank" href="https://last.fm">
              <img alt={messages.altLastFM} src={fallBackAvatar} />
            </a>
          </NavbarItems>
          <NavbarItems>
            {userProperties.error
              ? messages.noUser
              : match.isExact
              ? messages.promptUser
              : messages.loadingUser}
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
                alt={messages.altAvatar}
                src={
                  userProperties.imageUrl !== ""
                    ? userProperties.imageUrl
                    : fallBackAvatar
                }
              />
            </a>
          </NavbarItems>
          <NavbarItems>{userProperties.userName}</NavbarItems>
        </Navbar>
      </NavbarFixed>
    );
  }
};

export default withRouter(Header);
