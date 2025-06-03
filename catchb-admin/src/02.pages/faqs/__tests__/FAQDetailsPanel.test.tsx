import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { FAQDetailsPanel } from "../ui/FAQDetails/FAQDetailsPanel";
import { sampleFAQDetail } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

describe("FAQDetailsPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders and handles delete correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: sampleFAQDetail,
    });

    const { getByTestId, getByText } = renderWithProviders(<FAQDetailsPanel />);

    await waitFor(() => {
      expect(getByText("What is CatchB?")).toBeInTheDocument();
      expect(
        getByText(
          "CatchB is a platform that helps you manage your tasks efficiently."
        )
      ).toBeInTheDocument();
    });

    // test delete (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("delete-faq-button"));

    // test delete (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "delete").mockRejectedValueOnce(new Error("Delete Error"));
    fireEvent.click(getByTestId("delete-faq-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 삭제에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test delete (3회 성공)
    vi.spyOn(axios, "delete").mockResolvedValueOnce({});
    fireEvent.click(getByTestId("delete-faq-button"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/faqs");
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ가 성공적으로 삭제되었습니다."
      );
    });
  });

  it("renders deleted FAQ and handles reactivation", async () => {
    const deletedFAQ = {
      ...sampleFAQDetail,
      is_active: false,
    };

    vi.spyOn(axios, "get").mockResolvedValue({
      data: deletedFAQ,
    });

    const { getByText, getByTestId } = renderWithProviders(<FAQDetailsPanel />);

    await waitFor(() => {
      expect(getByText("삭제됨")).toBeInTheDocument();
    });

    // test reactivation (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("reactivate-faq-button"));
    expect(window.alert).not.toHaveBeenCalled();

    // test reactivation (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "post").mockRejectedValueOnce(
      new Error("Reactivate Error")
    );
    fireEvent.click(getByTestId("reactivate-faq-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ 재활성화에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test reactivation (3회 성공)
    vi.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.click(getByTestId("reactivate-faq-button"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/faqs");
      expect(window.alert).toHaveBeenCalledWith(
        "FAQ가 성공적으로 재활성화되었습니다."
      );
    });
  });

  it("handles API error on initial load", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    renderWithProviders(<FAQDetailsPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "정보를 불러오는 데 실패했습니다."
      );
    });
  });

  it("handles params error", async () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "invalid-id" });
    vi.spyOn(axios, "get").mockRejectedValue(new Error("Invalid ID"));

    renderWithProviders(<FAQDetailsPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
    });
  });
});
