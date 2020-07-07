import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { UserContext } from "../../providers/user/user.provider";
import { Navbar, NavbarContainer, NavbarItems } from "./header.styles";
import Assets from "../../configuration/assets";
import Routes from "../../configuration/routes";
import { HomePage } from "../../configuration/lastfm";

// Configuration
export const NavBarHeight = "50px";

const Header = ({ history, match }) => {
  const { userProperties } = React.useContext(UserContext);
  const { pathname } = history.location;
  const { t } = useTranslation();

  const handleLinkHome = () => {
    history.push(Routes.search);
  };

  const handleLinkContact = () => {
    history.push(Routes.contact);
  };

  const getHeaderMessage = () => {
    if (userProperties.error) return t("HeaderNoUser");
    if (pathname === Routes.contact) return t("HeaderTop20");
    if (pathname === Routes.search) return t("HeaderPromptUser");
    if (!userProperties.ready) return t("HeaderLoadingUser");
    return userProperties.userName;
  };

  const getHeaderMainIcon = () => {
    if (Object.values(Routes).includes(pathname) || !userProperties.ready) {
      return (
        <a rel="noopener noreferrer" target="_blank" href={HomePage}>
          <img alt={t("HeaderAltLastFM")} src={Assets.LastFMLogo} />
        </a>
      );
    }
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={userProperties.profileUrl}
      >
        <img
          alt={t("HeaderAltAvatar")}
          src={
            userProperties.imageUrl !== ""
              ? userProperties.imageUrl
              : Assets.LastFMLogo
          }
        />
      </a>
    );
  };

  const isSearching = () => {
    if (pathname === Routes.search) return true;
    if (!Object.values(Routes).includes(pathname) && !userProperties.ready)
      return true;
    return false;
  };

  return (
    <NavbarContainer NavBarHeight={NavBarHeight}>
      <Navbar NavBarHeight={NavBarHeight}>
        <NavbarItems>{getHeaderMainIcon()}</NavbarItems>
        <NavbarItems>{getHeaderMessage()}</NavbarItems>
        <NavbarItems>
          <div onClick={handleLinkHome}>
            <img
              className={isSearching() ? "here" : ""}
              alt={t("HeaderAltSearch")}
              src={Assets.SearchLogo}
            />
          </div>
          <div onClick={handleLinkContact}>
            <img
              className={pathname === Routes.contact ? "here" : ""}
              alt={t("HeaderAltContact")}
              src={Assets.ContactLogo}
            />
          </div>
        </NavbarItems>
      </Navbar>
    </NavbarContainer>
  );
};

export default withRouter(Header);
