import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { AnnouncementsPage } from "@pages/tabs/mypage";
import { sampleAnnouncements } from "@entities/announcements";
import * as AlertAPI from "@shared/lib/alert";
import { queryClient, renderWithProviders } from "@test-utils/renderer";

describe("공지사항 목록 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleAnnouncements });

    queryClient.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("공지사항을 가져오는데 실패하면, 오류 메시지를 보여주고 이전 페이지로 돌아간다", async () => {
    jest
      .spyOn(axios, "get")
      .mockRejectedValue(new Error("공지사항 목록을 가져오지 못했습니다."));

    renderWithProviders(<AnnouncementsPage />);

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message:
            "약관 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
      expect(Router.router.back).toHaveBeenCalled();
    });
  });

  it("성공하면 화면에 목록을 보여준다", async () => {
    const { getByText } = renderWithProviders(<AnnouncementsPage />);

    // 약관 목록을 가져오는 동안 로딩 화면을 보여준다
    expect(getByText("Loading Item")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("Sample Announcement 1")).toBeTruthy();
      expect(getByText("Sample Announcement 2")).toBeTruthy();
    });

    fireEvent.press(getByText("Sample Announcement 1"));
    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith("/mypage/announcements/1");
    });
  });
});
