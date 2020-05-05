import React from "react";
import Profile from "./profile.component";
import WithSpinner from "../spinner/spinner.component";
import WithBillboard from "../billboard/billboard.component";

import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";

const ProfileWithSpinner = WithBillboard(WithSpinner(Profile));

const ProfileContainer = () => {
  const { userProperties, dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    const fetchUserDetails = () => {
      setTimeout(function () {
        dispatch({ type: UserTypes.ToggleReady });
      }, 3000);
    };

    if (!userProperties.ready) {
      fetchUserDetails();
    }
  }, [dispatch, userProperties]);

  return <ProfileWithSpinner />;
};

export default ProfileContainer;
