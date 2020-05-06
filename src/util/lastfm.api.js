export const buildUrl = (username, key) => {
  const apiRoot = `https://ws.audioscrobbler.com/2.0/`;
  let queryString = [];
  const options = {
    method: "user.gettopalbums",
    user: username,
    api_key: key,
    format: "json",
  };
  Object.entries(options).forEach(([key, value]) => {
    return queryString.push(`${key}=${value}`);
  });
  const url = `${apiRoot}?${queryString.join("&")}`;
  return url;
};

const getTopAlbums = async (username) => {
  const url = buildUrl(username, process.env.REACT_APP_LASTFM_KEY);
  const result = await fetch(url);
  const status = result.status;
  const data = await result.json();
  return { data, status };
};

export default getTopAlbums;
