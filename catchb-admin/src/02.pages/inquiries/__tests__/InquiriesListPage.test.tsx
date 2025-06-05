import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { InquiriesListPage } from "../ui/InquiriesList/InquiriesListPage";
import { sampleInquiryThreadListResponse } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiriesListPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
    vi.spyOn(axios, "get").mockResolvedValue({
      data: sampleInquiryThreadListResponse,
    });
  });

  it("renders correctly and handles navigation", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesListPage />
    );

    expect(getByText("고객 문의 관리")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("How to reset my password?")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("inquiry-1"));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/inquiries/1");
    });

    // 상태 토글
    fireEvent.click(getByTestId("Closed-tab"));
    await waitFor(() => {
      expect(getByText("문의가 없습니다.")).toBeInTheDocument();
    });

    // 분류 토글
    fireEvent.click(getByTestId("분류별-tab"));
    await waitFor(() => {
      expect(getByTestId("Billing-tab")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("Billing-tab"));
    await waitFor(() => {
      expect(
        getByText("What payment methods are accepted?")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("상태별-tab"));
    await waitFor(() => {
      expect(getByTestId("Open-tab")).toBeInTheDocument();
    });
  });

  it("handles api error", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    const { getByText } = renderWithProviders(<InquiriesListPage />);

    await waitFor(() => {
      expect(getByText("고객 문의 관리")).toBeInTheDocument();
      expect(window.alert).toHaveBeenCalledWith(
        "문의 목록을 불러오는 데 실패했습니다."
      );
    });
  });
});
