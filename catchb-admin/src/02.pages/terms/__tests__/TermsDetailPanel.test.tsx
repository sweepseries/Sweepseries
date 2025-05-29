import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { TermsDetailPanel } from "../ui/TermsDetail/TermsDetailPanel";
import { sampleTermDetails } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermsDetailPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders and handles delete correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: sampleTermDetails,
    });

    const { getByTestId, getByText } = renderWithProviders(
      <TermsDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("약관 내용 - (필수) Terms of Service")
      ).toBeInTheDocument();
      expect(
        getByText("Updated version of the Terms of Service with minor changes.")
      ).toBeInTheDocument();
    });

    // test clicks
    fireEvent.click(getByTestId("version-item-1"));
    await waitFor(() => {
      expect(
        getByText("Initial version of the Terms of Service.")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("version-item-2"));
    await waitFor(() => {
      expect(
        getByText("Updated version of the Terms of Service with minor changes.")
      ).toBeInTheDocument();
    });

    // test delete (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("delete-term-button"));

    // test delete (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "delete").mockRejectedValueOnce(new Error("Delete Error"));
    fireEvent.click(getByTestId("delete-term-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 삭제에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test delete (3회 성공)
    vi.spyOn(axios, "delete").mockResolvedValueOnce({ data: {} });
    fireEvent.click(getByTestId("delete-term-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관이 성공적으로 삭제되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/terms");
    });
  });

  it("renders optional term correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: {
        ...sampleTermDetails,
        is_required: false,
        versions: {
          2: {
            id: 2,
            content: "",
            update_summary: "",
            created_at: "2025-06-01",
          },
        },
      },
    });

    const { getByText } = renderWithProviders(<TermsDetailPanel />);

    await waitFor(() => {
      expect(
        getByText("약관 내용 - (선택) Terms of Service")
      ).toBeInTheDocument();
    });
  });

  it("renders inactive term and handles reactivate correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleTermDetails, is_active: false },
    });

    const { getByTestId, getByText } = renderWithProviders(
      <TermsDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("약관 내용 - (필수) Terms of Service")
      ).toBeInTheDocument();
    });

    // test reactivate (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("reactivate-term-button"));

    // test reactivate (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "post").mockRejectedValueOnce(
      new Error("Reactivate Error")
    );
    fireEvent.click(getByTestId("reactivate-term-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 재활성화에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test reactivate (3회 성공)
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: {} });
    fireEvent.click(getByTestId("reactivate-term-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관이 성공적으로 재활성화되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/terms");
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
