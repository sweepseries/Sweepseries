import { fireEvent } from "@testing-library/react-native";

import { LandingPage } from "./LandingPage";
import * as AuthContext from "@contexts/auth";
import { renderWithProviders } from "@utils/test-utils";
import { defaultAuthContext } from "@testdata/contexts";

jest.mock("@features/CatchB", () => ({
  CatchBLogo: () => <div>Mocked CatchBLogo</div>,
}));

describe("<LandingPage />", () => {
  it("handles all buttons", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({ ...defaultAuthContext, mode: "guest" });

    const { getByTestId } = renderWithProviders(<LandingPage />);

    fireEvent.press(getByTestId("naver-button"));
    fireEvent.press(getByTestId("kakao-button"));
    fireEvent.press(getByTestId("catchb-button"));
    fireEvent.press(getByTestId("이메일로 가입하기"));
    fireEvent.press(getByTestId("비회원으로 둘러보기"));
  });

  it("handles redirect to home", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({ ...defaultAuthContext, mode: "pro" });

    renderWithProviders(<LandingPage />);
  });
});
