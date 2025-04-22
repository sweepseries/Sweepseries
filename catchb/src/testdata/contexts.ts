import { sampleRegisterData } from "./auth";

export const defaultAlertContext = {
  showAlert: jest.fn<void, [{ message: string; onConfirm: () => void }]>(),
  hideAlert: jest.fn(),
};

export const defaultAuthContext = {
  login: jest.fn(),
  logout: jest.fn(),
  mode: "guest",
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
