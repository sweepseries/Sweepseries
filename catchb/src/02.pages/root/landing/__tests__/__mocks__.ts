jest.unmock("@shared/lib/auth");

jest.mock("@features/auth/kakao-login/ui/kakao.svg", () => () => null);
jest.mock("@features/auth/naver-login/ui/naver.svg", () => () => null);
jest.mock("@react-native-kakao/user", () => ({
  me: jest.fn(),
  login: jest.fn(),
  isLogined: jest.fn(),
}));
