export const testUser = {
  userProperties: {
    imageUrl:
      "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
    profileUrl: "https://www.last.fm/user/niall-byrne",
    ready: true,
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
  },
  userName: "",
  setUserName: jest.fn(),
  dispatch: jest.fn(),
};
