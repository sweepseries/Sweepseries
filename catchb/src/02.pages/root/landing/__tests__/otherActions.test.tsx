import "./__mocks__";
import { fireEvent } from "@testing-library/react-native";
import * as Router from "expo-router";

import { LandingPage } from "@pages/root/landing";
import { renderWithProviders } from "@test-utils/renderer";

describe("시작 페이지: 나머지", () => {
  it("비회원으로 둘러보기", () => {
    const { getByTestId } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByTestId("비회원으로 둘러보기"));
    expect(Router.router.replace).toHaveBeenCalledWith("/home");
  });

  it("회원가입 페이지로 이동", () => {
    const { getByTestId } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByTestId("이메일로 가입하기"));
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/signup/terms",
      params: { mode: "catchb" },
    });
  });

  it("로그인 페이지로 이동", () => {
    const { getByText } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByText("이메일로 로그인"));
    expect(Router.router.push).toHaveBeenCalledWith("/login");
  });
});
