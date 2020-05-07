// Wraps the Profile Component with:
// - withSpinner
// - withBillboard
// - withRouter

import React from "react";
import Profile from "./profile.component";
import { withRouter } from "react-router-dom";
import withSpinner from "../spinner/spinner.component";
import withBillboard from "../billboard/billboard.component";
import { fetchProfile } from "./profile.async";

import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";

const ProfileWithSpinner = withBillboard(withSpinner(Profile));

const ProfileContainer = ({ match }) => {
  const { userProperties, dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    const fetchUserDetails = () => {
      dispatch({
        payload: match.params.userName,
        type: UserTypes.StartFetchUser,
        func: fetchProfile,
      });
    };
    if (!userProperties.ready) {
      fetchUserDetails();
    }
  }, [dispatch, userProperties]);

  return <ProfileWithSpinner />;
};

export default withRouter(ProfileContainer);
