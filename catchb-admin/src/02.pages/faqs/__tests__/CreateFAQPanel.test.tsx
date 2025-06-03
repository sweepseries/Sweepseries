import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { CreateFAQPanel } from "../ui/CreateFAQ/CreateFAQPanel";
import { sampleFAQListResponse } from "@entities/faqs";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("CreateFAQPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
    vi.spyOn(axios, "get").mockResolvedValue({ data: sampleFAQListResponse });
  });

  it("submit successfully", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["faqs"], sampleFAQListResponse);
    const { getByTestId, getByText } = renderWithProviders(<CreateFAQPanel />, {
      client: testClient,
    });

    expect(getByText("FAQ 생성")).toBeInTheDocument();

    // submit form (fail: unknown error)
    vi.spyOn(axios, "post").mockRejectedValue(new Error("Network Error"));
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 생성에 실패했습니다. 다시 시도해주세요."
      );
    });

    // submit form (fail: api error)
    vi.spyOn(axios, "post").mockRejectedValue({
      response: { data: { error: "카테고리를 선택해주세요." } },
    });
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 생성에 실패했습니다: 카테고리를 선택해주세요."
      );
    });

    // select category and submit form (success)
    vi.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: 1,
        question: "Test Question",
        answer: "Test Answer",
        category_id: 1,
      },
    });
    fireEvent.click(getByTestId("text-button-등록"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ가 성공적으로 생성되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/faqs/1");
    });
  });

  it("handles no category error", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["faqs"], {...sampleFAQListResponse, categories: []});

    const { getByTestId } = renderWithProviders(<CreateFAQPanel />, {
      client: testClient,
    });

    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("카테고리를 선택해주세요.");
    });
  });
});
