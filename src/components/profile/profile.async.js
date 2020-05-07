// Asynchonous Tasks for the Profile Component

import UserActions from "../../providers/user/user.actions";

const backend =
  process.env.ENV === "production"
    ? process.env.REACT_APP_BACKEND_PROD
    : process.env.REACT_APP_BACKEND_DEV;

const postData = async (url = "", data = {}, success, failure) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "same-origin",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (response.status === 200) return success(json);
  failure(json);
};

export const fetchProfile = (dispatch, state, userName) => {
  const success = (data) => {
    dispatch(state, { type: UserActions.SuccessFetchUser, payload: data });
  };

  const failure = (data) => {
    dispatch(state, { type: UserActions.FailureFetchUser, payload: data });
  };

  const response = postData(
    backend + "/lastfm/",
    {
      username: userName,
    },
    success,
    failure
  );
};
