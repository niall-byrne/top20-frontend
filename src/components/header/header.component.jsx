import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { Navbar, NavbarContainer, NavbarItems } from "./header.styles";
import { withRouter } from "react-router-dom";

// Configuration

export const fallBackAvatar = "./images/lastfm.png";

export const messages = {
  noUser: "No User Found",
  promptUser: "Specify your last.fm username",
  loadingUser: "Loading ...",
  altLastFM: "last.fm",
  altAvatar: "Avatar",
  contact: "contact",
};

export const NavBarHeight = "50px";

export const AboutLink = "/home/contact";

const Header = ({ history, match }) => {
  const { userProperties } = React.useContext(UserContext);

  const handleLink = () => {
    history.push(AboutLink);
  };

  if (!userProperties.ready) {
    return (
      <NavbarContainer NavBarHeight={NavBarHeight}>
        <Navbar NavBarHeight={NavBarHeight}>
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
          <NavbarItems>
            <div onClick={handleLink}>{messages.contact}</div>
          </NavbarItems>
        </Navbar>
      </NavbarContainer>
    );
  } else {
    return (
      <NavbarContainer NavBarHeight={NavBarHeight}>
        <Navbar NavBarHeight={NavBarHeight}>
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
          <NavbarItems>
            <div onClick={handleLink}>{messages.contact}</div>
          </NavbarItems>
        </Navbar>
      </NavbarContainer>
    );
  }
};

export default withRouter(Header);
