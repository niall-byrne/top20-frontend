// Asynchonous Tasks for the Profile Component

export const backend = () => {
  return process.env.ENV === "production"
    ? process.env.REACT_APP_BACKEND
    : "http://localhost:5000";
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
    return failure({ userName: "" });
  }
};

export const fetchProfile = async (state, action) => {
  return await postData(
    process.env.REACT_APP_BACKEND + "/lastfm/",
    {
      username: action.userName,
    },
    action.success,
    action.failure
  );
};
