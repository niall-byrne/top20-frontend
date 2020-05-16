// Asynchonous Tasks for the Profile Component
import { DefaultBackend } from "../../configuration/lastfm";

export const backend = () => {
  return process.env.NODE_ENV !== "production"
    ? DefaultBackend
    : process.env.REACT_APP_BACKEND;
};

const postData = async (url, data, success, failure) => {
  try {
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
    if (response.status === 200) {
      return success(json);
    } else {
      return failure(json);
    }
  } catch {
    // Server Error
    return failure({});
  }
};

export const fetchProfile = (state, action) => {
  return postData(
    backend() + "/lastfm/",
    {
      username: action.userName,
    },
    action.success,
    action.failure
  );
};
