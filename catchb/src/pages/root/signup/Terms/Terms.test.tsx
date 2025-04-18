import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";

import { TermsAndConditions } from "./Terms";
import * as AlertContext from "@contexts/app";
import * as TermsAPI from "@services/app/terms";
import { sampleTermsAndConditions } from "@testdata/app";
import { renderWithProviders } from "@utils/test-utils";

jest.spyOn(AlertContext, "useAlert").mockImplementation(() => {
  const showAlertMock = jest
    .fn()
    .mockImplementation(({ onConfirm }: { onConfirm: () => void }) => {
      onConfirm();
    });

  return {
    showAlert: showAlertMock,
  };
});

describe("<TermsAndConditions />", () => {
  beforeEach(() => {
    jest
      .spyOn(Router, "useLocalSearchParams")
      .mockReturnValue({ mode: "catchb" });
    jest
      .spyOn(TermsAPI, "getTerms")
      .mockResolvedValue(sampleTermsAndConditions);
  });

  it("renders and handles presses correctly", async () => {
    const { getByText, getByTestId } = renderWithProviders(
      <TermsAndConditions />
    );

    await waitFor(() => {
      expect(getByText("(필수) 서비스 이용약관")).toBeTruthy();
    });

    fireEvent.press(getByText("모두 동의 합니다."));
    fireEvent.press(getByText("모두 동의 합니다."));
    fireEvent.press(getByText("(필수) 서비스 이용약관"));
    fireEvent.press(getByText("(선택) 알림 수신 동의"));
    fireEvent.press(getByTestId("right-(필수) 서비스 이용약관"));

    await waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });

  it("renders and handles social login mode", async () => {
    jest
      .spyOn(Router, "useLocalSearchParams")
      .mockReturnValue({ mode: "naver" });

    const { getByTestId } = renderWithProviders(<TermsAndConditions />);

    await waitFor(() => {
      fireEvent.press(getByTestId("button"));
    });
  });

  it("handles api error", async () => {
    jest.spyOn(TermsAPI, "getTerms").mockResolvedValue(null);

    renderWithProviders(<TermsAndConditions />);
  });
});
