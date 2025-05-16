import { Linking } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { InquiriesPage } from "@pages/tabs/mypage";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";
import { sampleInquiries } from "@entities/inquiries";

describe("1:1 문의 페이지", () => {
  const showAlertMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("내부 헤더", async () => {
    const { getByTestId } = renderWithProviders(<InquiriesPage />);

    // 헤더가 있는지 확인
    expect(getByTestId("guide-text")).toBeTruthy();
    expect(getByTestId("1:1 문의하기")).toBeTruthy();

    // 이메일 주소 & 복사 버튼 확인
    fireEvent.press(getByTestId("email"));
    expect(Linking.openURL).toHaveBeenCalledWith(
      "mailto:support@sweepseries.com"
    );
    fireEvent.press(getByTestId("copy"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "복사 완료",
          message: "이메일 주소가 복사되었습니다.",
        })
      );
    });
  });

  it("문의 목록 1: 에러처리 & empty 처리", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Network Error"));

    const { getByText } = renderWithProviders(<InquiriesPage />);

    // 로딩 중에는 로딩 스켈레톤이 보인다.
    expect(getByText("Loading Item")).toBeTruthy();

    // 에러가 발생하면, 에러 가이드가 보인다.
    await waitFor(() => {
      expect(getByText("문의 내역이 없습니다.")).toBeTruthy();
    });

    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
    // 없으면, 문의내역이 없습니다.
    expect(getByText("문의 내역이 없습니다.")).toBeTruthy();
  });

  it("문의 목록 2: 성공 처리", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleInquiries });

    const { getByTestId, getByText } = renderWithProviders(<InquiriesPage />);

    await waitFor(() => {
      // 구분, 제목 표시
      expect(getByText("[Category 1] Inquiry 1")).toBeTruthy();
      expect(getByText("[Category 2] Inquiry 2")).toBeTruthy();
      // 상태 표시
      expect(getByText("답변완료")).toBeTruthy();
      expect(getByText("답변대기")).toBeTruthy();
    });

    // 문의 하나를 누르면, 상세 페이지로 이동한다.
    fireEvent.press(getByTestId("inquiry-1"));
    expect(router.push).toHaveBeenCalledWith("/mypage/inquiries/1");
  });

  it("새 문의 생성", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleInquiries });

    const { getByTestId, getByText } = renderWithProviders(<InquiriesPage />);

    // 내부 헤더 안에 Form 버튼을 누르면 Form이 나타난다.
    fireEvent.press(getByTestId("1:1 문의하기"));
    expect(getByText("고객정보")).toBeTruthy();
    expect(getByText("질문구분")).toBeTruthy();
    expect(getByText("문의하기")).toBeTruthy();
    expect(getByTestId("등록")).toBeDisabled();
  });
});
