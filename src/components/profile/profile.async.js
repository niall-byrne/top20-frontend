// Asynchonous Tasks for the Profile Component

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
  return failure(json);
};

export const fetchProfile = (state, action) => {
  postData(
    backend + "/lastfm/",
    {
      username: action.userName,
    },
    action.success,
    action.failure
  );
};
