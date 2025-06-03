import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { FAQsListPage } from "../ui/FAQsList/FAQsListPage";
import { sampleFAQListResponse } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQsListPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
    vi.spyOn(axios, "get").mockResolvedValue({ data: sampleFAQListResponse });
  });

  it("renders correctly and handles navigation", async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <FAQsListPage />
    );

    expect(getByText("자주 묻는 질문 관리")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("General")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("category-filter-General"));
    await waitFor(() => {
      expect(getByText("What is CatchB?")).toBeInTheDocument();
      expect(queryByText("How to reset my password?")).not.toBeInTheDocument();
    });

    fireEvent.click(getByTestId("category-filter-Technical"));
    await waitFor(() => {
      expect(getByText("How to reset my password?")).toBeInTheDocument();
      expect(queryByText("What is CatchB?")).not.toBeInTheDocument();
    });

    fireEvent.click(getByTestId("faq-2"));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/faqs/2");
    });
  });

  it("handles api error", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    const { getByText } = renderWithProviders(<FAQsListPage />);

    await waitFor(() => {
      expect(getByText("자주 묻는 질문 관리")).toBeInTheDocument();
      expect(window.alert).toHaveBeenCalledWith(
        "자주 묻는 질문 목록을 불러오는 데 실패했습니다."
      );
    });
  });
});
