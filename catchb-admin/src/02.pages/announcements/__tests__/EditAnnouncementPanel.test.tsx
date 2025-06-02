import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { EditAnnouncementPanel } from "../ui/EditAnnouncement/EditAnnouncementPanel";
import { sampleAnnouncementDetails, sampleAnnouncements } from "@entities/announcements";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("EditAnnouncementPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("handles invalid ID", () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "invalid" });

    renderWithProviders(<EditAnnouncementPanel />);

    expect(window.alert).toHaveBeenCalledWith(
      "오류가 발생했습니다. 다시 시도해주세요."
    );
    expect(navigateMock).toHaveBeenCalledWith("/announcements");
  });

  it("fill form and submit successfully", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(
      ["announcementDetails", 1],
      sampleAnnouncements[0]
    );

    const { getByTestId, getByText } = renderWithProviders(
      <EditAnnouncementPanel />,
      {
        client: testClient,
      }
    );

    expect(getByText("공지 수정")).toBeInTheDocument();

    // fill form
    fireEvent.change(getByTestId("textinput-공지 제목"), {
      target: { value: "Updated Announcement" },
    });
    fireEvent.change(getByTestId("textarea-공지 내용"), {
      target: { value: "This is an updated announcement content." },
    });
    // toggle important checkbox
    fireEvent.click(getByTestId("checkbox-중요 공지"));

    // submit form (fail: unknown error)
    vi.spyOn(axios, "put").mockRejectedValueOnce({});
    fireEvent.click(getByTestId("text-button-저장"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지 수정에 실패했습니다. 다시 시도해주세요."
      );
    });

    // submit form (fail: API error)
    vi.spyOn(axios, "put").mockRejectedValueOnce({
      response: {
        data: { error: "API Error" },
      },
    });
    fireEvent.click(getByTestId("text-button-저장"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지 수정에 실패했습니다: API Error"
      );
    });

    // submit form (success)
    vi.spyOn(axios, "put").mockResolvedValueOnce({ data: sampleAnnouncementDetails });
    fireEvent.click(getByTestId("text-button-저장"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항이 성공적으로 수정되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/announcements/2");
    });
  });
});
