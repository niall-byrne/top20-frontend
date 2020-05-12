export const setUserNameMock = jest.fn();
export const dispatchMock = jest.fn();

export const testUser = {
  userProperties: {
    userName: "niall-byrne",
    imageUrl:
      "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
    profileUrl: "https://www.last.fm/user/niall-byrne",
    ready: true,
    error: false,
    data: {},
  },
  dispatch: dispatchMock,
};

export const testUserWithoutImage = {
  userProperties: {
    userName: "niall-byrne",
    imageUrl: "",
    profileUrl: "https://www.last.fm/user/niall-byrne",
    ready: true,
    error: false,
    data: {},
  },
  dispatch: dispatchMock,
};

export const noUser = {
  userProperties: {
    userName: "",
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: false,
    data: null,
  },
  dispatch: dispatchMock,
};

export const noUserError = {
  userProperties: {
    userName: "",
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: false,
    data: null,
  },
  dispatch: dispatchMock,
};

export const userError = {
  userProperties: {
    userName: "errorUser",
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: true,
    data: null,
  },
  dispatch: dispatchMock,
};

export const userBeforeFetch = {
  userProperties: {
    userName: "niall-byrne",
    imageUrl: "",
    profileUrl: "",
    ready: false,
    error: false,
    data: {},
  },
  dispatch: dispatchMock,
};

export const userBeforeFetchUrlEncodingNeeded = {
  userProperties: {
    userName: "/niall-byrne",
    imageUrl: "",
    profileUrl: "",
    ready: false,
    error: false,
    data: {},
  },
  dispatch: dispatchMock,
};

export const userBeforeFetchReady = {
  userProperties: {
    userName: "niall-byrne",
    imageUrl: "",
    profileUrl: "",
    ready: true,
    error: false,
    data: {},
  },
  dispatch: dispatchMock,
};
