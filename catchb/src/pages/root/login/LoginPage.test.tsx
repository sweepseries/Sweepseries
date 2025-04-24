import { fireEvent } from "@testing-library/react-native";

import { LoginPage } from "./LoginPage";
import * as AuthContext from "@contexts/auth";
import { renderWithProviders } from "@utils/test-utils";
import { defaultAuthContext } from "@testdata/contexts";

jest.mock("@features/CatchB", () => ({
  CatchBLogo: () => <></>,
}));

describe("<LoginPage />", () => {
  it("handles login correctly", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      ...defaultAuthContext,
      mode: "guest",
      catchBLogin: jest.fn().mockResolvedValue(true),
    });
    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.press(getByTestId("로그인")); // falls back since username and password are empty

    fireEvent.changeText(getByTestId("아이디"), "user");
    fireEvent.changeText(getByTestId("비밀번호"), "1234");
    fireEvent.press(getByTestId("로그인")); // successful login
  });

  it("handles login fail and back button correctly", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      ...defaultAuthContext,
      mode: "guest",
      catchBLogin: jest.fn().mockResolvedValue(false),
    });
    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.changeText(getByTestId("아이디"), "user");
    fireEvent.changeText(getByTestId("비밀번호"), "1234");
    fireEvent.press(getByTestId("로그인")); // login fail

    fireEvent.press(getByTestId("돌아가기"));
  });
});
