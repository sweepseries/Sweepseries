import { fireEvent } from "@testing-library/react-native";
import * as Router from "expo-router";

import { LoginNeeded } from "@shared/ui/Fallbacks";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Fallbacks");

describe("LoginNeeded Component", () => {
  it("renders correctly and navigates", () => {
    const { getByTestId } = renderWithProviders(<LoginNeeded />);

    expect(getByTestId("로그인 하러가기")).toBeTruthy();

    // router.canDismiss()가 false일 때
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);
    fireEvent.press(getByTestId("로그인 하러가기"));
    expect(Router.router.replace).toHaveBeenCalledWith("/");

    // router.canDismiss()가 true일 때
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(true);
    fireEvent.press(getByTestId("로그인 하러가기"));
    expect(Router.router.dismissAll).toHaveBeenCalled();
  });
});
