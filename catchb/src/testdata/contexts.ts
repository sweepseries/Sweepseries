import { sampleRegisterData } from "./auth";

export const defaultAlertContext = {
  showAlert: jest.fn<void, [{ message: string; onConfirm: () => void }]>(),
  hideAlert: jest.fn(),
};

export const defaultAuthContext = {
  kakaoLogin: jest.fn(),
  naverLogin: jest.fn(),
  catchBLogin: jest.fn(),
  logout: jest.fn(),
  mode: "guest",
  uuid: null
};

export const defaultSignupContext = {
  setNotificationsAgreed: jest.fn(),
  setUsernameEmail: jest.fn(),
  setPasswords: jest.fn(),
  setNamePhone: jest.fn(),
  data: sampleRegisterData,
};

export const defaultThemeContext = {
  theme: {},
  colorScheme: "light",
};
