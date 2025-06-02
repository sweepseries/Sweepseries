import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { CreateAnnouncementPanel } from "../ui/CreateAnnouncement/CreateAnnouncementPanel";
import { sampleAnnouncements } from "@entities/announcements";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("CreateAnnouncementPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("fill form and submit successfully", async () => {
    const testClient = createTestQueryClient();
    vi.spyOn(axios, "post").mockResolvedValue({ data: sampleAnnouncements[0] });

    const { getByTestId, getByText } = renderWithProviders(
      <CreateAnnouncementPanel />,
      {
        client: testClient,
      }
    );

    expect(getByText("공지 생성")).toBeInTheDocument();

    // fill form
    fireEvent.change(getByTestId("textinput-공지 제목"), {
      target: { value: "Test Announcement" },
    });
    fireEvent.change(getByTestId("textarea-공지 내용"), {
      target: { value: "This is a test announcement content." },
    });
    // toggle important checkbox
    fireEvent.click(getByTestId("checkbox-중요 공지"));

    // submit form (fail: known error)
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "제목을 입력해주세요." } },
    });
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지 생성에 실패했습니다: 제목을 입력해주세요."
      );
    });

    // submit form (success)
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항이 성공적으로 생성되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/announcements/1");
    });
  });

  it("submit successfully with pre-existing query", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["announcements"], [sampleAnnouncements[1]]);
    vi.spyOn(axios, "post").mockResolvedValue({ data: sampleAnnouncements[0] });

    const { getByTestId } = renderWithProviders(<CreateAnnouncementPanel />, {
      client: testClient,
    });

    // submit form (fail: unknown error)
    vi.spyOn(axios, "post").mockRejectedValueOnce({});
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지 생성에 실패했습니다. 다시 시도해주세요."
      );
    });

    // submit form (success)
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "공지사항이 성공적으로 생성되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/announcements/1");
    });
  });
});
