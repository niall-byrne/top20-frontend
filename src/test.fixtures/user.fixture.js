export const testUser = {
  userProperties: {
    imageUrl:
      "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
    profileUrl: "https://www.last.fm/user/niall-byrne",
    ready: true,
    error: false,
    data: {},
  },
  userName: "niall-byrne",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};

export const testUserWithoutImage = {
  userProperties: {
    imageUrl: "",
    profileUrl: "https://www.last.fm/user/niall-byrne",
    ready: true,
    error: false,
    data: {},
  },
  userName: "niall-byrne",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};

export const noUser = {
  userProperties: {
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: false,
    data: null,
  },
  userName: "",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};

export const noUserError = {
  userProperties: {
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: false,
    data: null,
  },
  userName: "",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};

export const userError = {
  userProperties: {
    imageUrl: null,
    profileUrl: null,
    ready: false,
    error: true,
    data: null,
  },
  userName: "errorUser",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};
