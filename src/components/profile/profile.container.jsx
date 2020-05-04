import React from "react";
import Profile from "./profile.component";
import WithSpinner from "../spinner/spinner.component";
import WithBillboard from "../billboard/billboard.component";

import { UserContext } from "../../providers/user/user.provider";

const ProfileWithSpinner = WithBillboard(WithSpinner(Profile));

const ProfileContainer = () => {
  const { ready, toggleReady } = React.useContext(UserContext);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      await setInterval(function () {
        toggleReady();
      }, 3000);
    };

    if (!ready) {
      fetchUserDetails();
    }
  }, [toggleReady]);

  return <ProfileWithSpinner />;
};

export default ProfileContainer;
