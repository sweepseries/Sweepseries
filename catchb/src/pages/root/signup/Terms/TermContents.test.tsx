import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";

import { TermContents } from "./TermContents";
import * as TermsAPI from "@services/app/terms";
import { sampleTermsAndConditions } from "@testdata/app";
import { renderWithProviders } from "@utils/test-utils";

describe("<TermContents />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({ id: "1" });
  });

  it("renders term correctly", async () => {
    jest
      .spyOn(TermsAPI, "getTermsDetail")
      .mockResolvedValue(sampleTermsAndConditions);

    const { getByTestId } = renderWithProviders(<TermContents />);

    await waitFor(() => fireEvent.press(getByTestId("닫기")));
  });

  it("handles api error", async () => {
    jest.spyOn(TermsAPI, "getTermsDetail").mockResolvedValue(null);

    renderWithProviders(<TermContents />);
  });
});
