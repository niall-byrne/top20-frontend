import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { Navbar, NavbarContainer, NavbarItems } from "./header.styles";
import { withRouter } from "react-router-dom";
import Assets from "../../configuration/assets";
import messages from "../../configuration/messages";
import Routes from "../../configuration/routes";
import { HomePage } from "../../configuration/lastfm";

// Configuration
export const NavBarHeight = "50px";

const Header = ({ history, match }) => {
  const { userProperties } = React.useContext(UserContext);
  const { pathname } = history.location;

  const handleLinkHome = () => {
    history.push(Routes.search);
  };

  const handleLinkContact = () => {
    history.push(Routes.contact);
  };

  const getHeaderMessage = () => {
    if (userProperties.error) return messages.HeaderNoUser;
    if (pathname === Routes.contact) return messages.HeaderTop20;
    if (pathname === Routes.search) return messages.HeaderPromptUser;
    return messages.HeaderLoadingUser;
  };

  if (!userProperties.ready || pathname === Routes.contact) {
    return (
      <NavbarContainer NavBarHeight={NavBarHeight}>
        <Navbar NavBarHeight={NavBarHeight}>
          <NavbarItems>
            <a rel="noopener noreferrer" target="_blank" href={HomePage}>
              <img alt={messages.HeaderAltLastFM} src={Assets.LastFMLogo} />
            </a>
          </NavbarItems>
          <NavbarItems>{getHeaderMessage()}</NavbarItems>
          <NavbarItems>
            <div onClick={handleLinkHome}>
              <img alt={messages.HeaderAltSearch} src={Assets.SearchLogo} />
            </div>
            <div onClick={handleLinkContact}>
              <img alt={messages.HeaderAltContact} src={Assets.ContactLogo} />
            </div>
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
                alt={messages.HeaderAltAvatar}
                src={
                  userProperties.imageUrl !== ""
                    ? userProperties.imageUrl
                    : Assets.LastFMLogo
                }
              />
            </a>
          </NavbarItems>
          <NavbarItems>{userProperties.userName}</NavbarItems>
          <NavbarItems>
            <div onClick={handleLinkHome}>
              <img alt={messages.HeaderAltSearch} src={Assets.SearchLogo} />
            </div>
            <div onClick={handleLinkContact}>
              <img alt={messages.HeaderAltContact} src={Assets.ContactLogo} />
            </div>
          </NavbarItems>
        </Navbar>
      </NavbarContainer>
    );
  }
};

export default withRouter(Header);
