import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { AnnouncementsListPage } from "../ui/AnnouncementsList/AnnouncementsListPage";
import { sampleAnnouncements } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementsListPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
    vi.spyOn(axios, "get").mockResolvedValue({ data: sampleAnnouncements });
  });

  it("renders correctly", async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AnnouncementsListPage />
    );

    expect(getByText("Catch B 공지 관리")).toBeInTheDocument();

    fireEvent.click(getByTestId("유효-tab"));
    await waitFor(() => {
      expect(queryByText("Announcement 1")).not.toBeInTheDocument();
      expect(getByText("Announcement 2")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("삭제됨-tab"));
    await waitFor(() => {
      expect(getByText("Announcement 1")).toBeInTheDocument();
      expect(queryByText("Announcement 2")).not.toBeInTheDocument();
    });

    fireEvent.click(getByText("추가"));
    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/announcements/create");
    });

    fireEvent.click(getByTestId("announcement-1"));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/announcements/1");
    });
  });

  it("handles sort correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <AnnouncementsListPage />
    );

    expect(getByText("Catch B 공지 관리")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("Announcement 2")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("전체-tab"));
    
    fireEvent.click(getByTestId("sort-id")); // Sort by ID (descending)
    fireEvent.click(getByTestId("sort-id")); // Toggle to ascending
    fireEvent.click(getByTestId("sort-id")); // Toggle back to descending

    fireEvent.click(getByTestId("sort-created-at")); // Sort by created_at (descending)
    fireEvent.click(getByTestId("sort-created-at")); // Toggle to ascending

    fireEvent.click(getByTestId("sort-updated-at")); // Sort by updated_at (descending)
    fireEvent.click(getByTestId("sort-updated-at")); // Toggle to ascending

    fireEvent.click(getByTestId("reset-sort")); // Reset
  });

  it("handles api error", async () => {
    vi.spyOn(axios, "get").mockRejectedValue({ error: "API Error" });

    renderWithProviders(<AnnouncementsListPage />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항 목록을 불러오는 데 실패했습니다."
      );
    });
  });
});
