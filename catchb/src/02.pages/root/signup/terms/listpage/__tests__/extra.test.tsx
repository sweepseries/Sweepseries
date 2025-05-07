import { Text } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import axios from "axios";

import { TermsListProvider, useTermsList } from "../provider/TermsListProvider";
import { SignupProvider } from "@features/signup/common";
import { sampleTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = useTermsList();

  return <Text>{isLoading ? "Loading" : "Ready"}</Text>;
};

describe("TermsListProvider", () => {
  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});

describe("약관 목록 페이지", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("약관 목록에 알림 수신 동의가 없다", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [sampleTerms[0]] });

    const { getByText } = renderWithProviders(
      <SignupProvider>
        <TermsListProvider>
          <TestComponent />
        </TermsListProvider>
      </SignupProvider>
    );

    await waitFor(() => {
      expect(getByText("Ready")).toBeTruthy();
    });
  });
});
