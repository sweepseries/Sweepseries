import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { TermsDetailPanel } from "../ui/TermsDetail/TermsDetailPanel";
import { sampleTermDetails } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermsDetailPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
  });

  it("renders correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleTermDetails,
    });

    const { getByTestId, getByText } = renderWithProviders(
      <TermsDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("약관 내용 - (필수) Terms of Service")
      ).toBeInTheDocument();
    });

    // test clicks
    waitFor(() => {
      fireEvent.click(getByTestId("version-item-2"));
      fireEvent.click(getByTestId("version-item-1"));
    });
  });

  it("renders optional term correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: { ...sampleTermDetails, is_required: false },
    });

    const { getByText } = renderWithProviders(<TermsDetailPanel />);

    await waitFor(() => {
      expect(
        getByText("약관 내용 - (선택) Terms of Service")
      ).toBeInTheDocument();
    });
  });

  it("handles api error correctly", async () => {
    vi.spyOn(axios, "get").mockRejectedValueOnce(new Error("API Error"));

    renderWithProviders(<TermsDetailPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 상세 정보를 불러오는 데 실패했습니다."
      );
    });
  });

  it("handles param error correctly", async () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "asdf" });

    renderWithProviders(<TermsDetailPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
    });
  });
});
