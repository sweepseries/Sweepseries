import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { EditFAQPanel } from "../ui/EditFAQ/EditFAQPanel";
import { sampleFAQDetail } from "@entities/faqs";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("EditFAQPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("handles invalid ID", () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "invalid" });

    renderWithProviders(<EditFAQPanel />);

    expect(window.alert).toHaveBeenCalledWith(
      "오류가 발생했습니다. 다시 시도해주세요."
    );
    expect(navigateMock).toHaveBeenCalledWith("/faqs");
  });

  it("fill form and submit successfully", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["faqDetails", 1], sampleFAQDetail);

    const { getByText } = renderWithProviders(<EditFAQPanel />, {
      client: testClient,
    });

    expect(getByText("FAQ 수정")).toBeInTheDocument();

    // submit form (fail: unknown error)
    vi.spyOn(axios, "put").mockRejectedValue(new Error("Unknown error"));
    fireEvent.click(getByText("저장"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 수정에 실패했습니다. 다시 시도해주세요."
      );
      expect(navigateMock).not.toHaveBeenCalled();
    });

    // submit form (fail: api error)
    vi.spyOn(axios, "put").mockRejectedValue({
      response: {
        data: { error: "API Error" },
      },
    });
    fireEvent.click(getByText("저장"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 수정에 실패했습니다: API Error"
      );
      expect(navigateMock).not.toHaveBeenCalled();
    });

    // submit form (success)
    vi.spyOn(axios, "put").mockResolvedValue({
      data: { ...sampleFAQDetail, id: 1 },
    });
    fireEvent.click(getByText("저장"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ가 성공적으로 수정되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/faqs/1");
    });
  });

  it("handles no category error", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["faqDetails", 1], {...sampleFAQDetail, category: null});

    const { getByText } = renderWithProviders(<EditFAQPanel />, {
      client: testClient,
    });

    expect(getByText("FAQ 수정")).toBeInTheDocument();

    // submit form without category
    fireEvent.click(getByText("저장"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("카테고리를 선택해주세요.");
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
