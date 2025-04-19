import { fireEvent, waitFor } from "@testing-library/react-native";

import { UsernameEmail } from "./UsernameEmail";
import * as AuthAPIs from "@services/auth/register";
import { renderWithProviders } from "@utils/test-utils";

describe("<UsernameEmail />", () => {
  it("handles check correctly", async () => {
    jest.spyOn(AuthAPIs, "checkUsernameEmail").mockResolvedValue({
      status: 204,
      data: null,
    });

    const { getByTestId } = renderWithProviders(<UsernameEmail />);

    await waitFor(() => {
      fireEvent.changeText(
        getByTestId("로그인 시 사용할 아이디를 입력해주세요."),
        "test"
      );
      fireEvent.changeText(
        getByTestId("이메일을 입력해주세요."),
        "test@email.com"
      );
    });
    fireEvent.press(getByTestId("button"));
  });

  it("handles check username fail correctly", () => {
    jest.spyOn(AuthAPIs, "checkUsernameEmail").mockResolvedValue({
      status: 400,
      data: { error: "아이디 중복" },
    });

    const { getByTestId } = renderWithProviders(<UsernameEmail />);

    waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });

  it("handles check email fail correctly", () => {
    jest.spyOn(AuthAPIs, "checkUsernameEmail").mockResolvedValue({
      status: 400,
      data: { error: "이메일 중복" },
    });

    const { getByTestId } = renderWithProviders(<UsernameEmail />);

    waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });

  it("handles check unknown failure 1 correctly", () => {
    jest.spyOn(AuthAPIs, "checkUsernameEmail").mockResolvedValue({
      status: 400,
      data: { error: "unknown error" },
    });

    const { getByTestId } = renderWithProviders(<UsernameEmail />);

    waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });

  it("handles check unknown failure 2 correctly", () => {
    jest.spyOn(AuthAPIs, "checkUsernameEmail").mockResolvedValue({
      status: 500,
      data: {},
    });

    const { getByTestId } = renderWithProviders(<UsernameEmail />);

    waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });
});
