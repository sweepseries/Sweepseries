import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { AnnouncementDetailsPanel } from "../ui/AnnouncementDetails/AnnouncementDetailsPanel";
import { sampleAnnouncementDetails } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementDetailsPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders and handles delete correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: sampleAnnouncementDetails,
    });

    const { getByTestId, getByText } = renderWithProviders(
      <AnnouncementDetailsPanel />
    );

    await waitFor(() => {
      expect(getByText("Announcement 2")).toBeInTheDocument();
      expect(
        getByText("This is the content of Announcement 2.")
      ).toBeInTheDocument();
    });

    // test delete (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("delete-announcement-button"));

    // test delete (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "delete").mockRejectedValueOnce(new Error("Delete Error"));
    fireEvent.click(getByTestId("delete-announcement-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항 삭제에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test delete (3회 성공)
    vi.spyOn(axios, "delete").mockResolvedValueOnce({});
    fireEvent.click(getByTestId("delete-announcement-button"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/announcements");
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항이 성공적으로 삭제되었습니다."
      );
    });
  });

  it("handles reactivation correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleAnnouncementDetails, is_deleted: true },
    });

    const { getByTestId, getByText } = renderWithProviders(
      <AnnouncementDetailsPanel />
    );

    await waitFor(() => {
      expect(getByText("Announcement 2")).toBeInTheDocument();
      expect(
        getByText("This is the content of Announcement 2.")
      ).toBeInTheDocument();
    });

    // test reactivate (1회 실패: cancel)
    vi.spyOn(window, "confirm").mockImplementationOnce(() => false);
    fireEvent.click(getByTestId("reactivate-announcement-button"));

    // test reactivate (2회 실패: bad response)
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(axios, "post").mockRejectedValueOnce(
      new Error("Reactivate Error")
    );
    fireEvent.click(getByTestId("reactivate-announcement-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항 재활성화에 실패했습니다. 다시 시도해주세요."
      );
    });

    // test reactivate (3회 성공)
    vi.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.click(getByTestId("reactivate-announcement-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항이 성공적으로 재활성화되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/announcements");
    });
  });

  it("renders empty content and handles nav to edit correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleAnnouncementDetails, content: "" },
    });

    const { getByTestId, getByText } = renderWithProviders(
      <AnnouncementDetailsPanel />
    );

    await waitFor(() => {
      expect(getByText("내용 없음")).toBeInTheDocument();
    });

    // test navigate to edit
    fireEvent.click(getByTestId("edit-announcement-button"));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/announcements/2/edit");
    });
  });

  it("handles api error correctly", async () => {
    vi.spyOn(axios, "get").mockRejectedValueOnce(new Error("API Error"));

    renderWithProviders(<AnnouncementDetailsPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항 상세 정보를 불러오는 데 실패했습니다."
      );
    });
  });

  it("handles invalid ID and navigates to announcements list", async () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "invalid" });
    
    renderWithProviders(<AnnouncementDetailsPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
      expect(navigateMock).toHaveBeenCalledWith("/announcements");
    });
  });
});
