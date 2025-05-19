import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { InquiriesPage } from "@pages/tabs/mypage";
import { sampleInquiries } from "@entities/inquiries";
import * as AlertAPI from "@shared/lib/alert";
import * as AuthAPI from "@shared/lib/auth";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("1:1 문의 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleInquiries });
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: true,
      user: AuthAPI.sampleUserProfile,
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
      mode: "NORMAL",
    });
  });

  it("새 문의 생성 (로그인 한 유저 + without query client cache)", async () => {
    const testClient = createTestQueryClient();

    const { getByTestId, getByText, queryByTestId } = renderWithProviders(
      <InquiriesPage />,
      {
        client: testClient,
      }
    );

    // 내부 헤더 안에 Form 버튼을 누르면 Form이 나타난다.
    fireEvent.press(getByTestId("1:1 문의하기"));
    expect(getByText("고객정보")).toBeTruthy();
    expect(getByText("질문구분")).toBeTruthy();
    expect(getByText("문의하기")).toBeTruthy();
    expect(queryByTestId("1:1 문의하기")).toBeFalsy();
    expect(getByTestId("등록")).toBeDisabled();

    // 로그인한 유저는 고객정보를 입력할 수 없다.
    expect(getByTestId("name-input")).toHaveProp("editable", false);
    expect(getByTestId("email-input")).toHaveProp("editable", false);

    // Form을 닫으면, 다시 버튼이 나타난다.
    fireEvent.press(getByTestId("취소"));
    expect(getByTestId("1:1 문의하기")).toBeTruthy();
    expect(queryByTestId("고객정보")).toBeFalsy();

    // 다시 Form을 열고, 필드를 채운다.
    fireEvent.press(getByTestId("1:1 문의하기"));
    fireEvent.changeText(getByTestId("title-input"), "샘플 제목");
    fireEvent.changeText(getByTestId("content-input"), "샘플 내용");

    // 개인정보 수집 및 이용 동의 체크를 하지 않으면, 등록 버튼이 비활성화된다.
    expect(getByTestId("등록")).toBeDisabled();

    // 실패 alert를 테스트 2: 서버 에러 메시지 띄우기
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "샘플 에러 메시지" } },
    });
    fireEvent.press(getByTestId("등록"));

    // 체크를 하여 등록 버튼을 활성화 시킨다.
    fireEvent.press(getByTestId("term-accept-checkbox"));
    expect(getByTestId("등록")).toBeEnabled();

    // 실패 사례 테스트 1: 서버 에러 메시지
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "등록 실패",
          message: "샘플 에러 메시지",
        })
      );
    });

    // 성공 사례 테스트
    testClient.clear(); // query client cache를 초기화 한다.
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: 4,
        title: "샘플 제목",
        category: "기타",
        status: "신규",
        created_at: "2023-10-04T12:00:00Z",
        is_updated: true,
      },
    });
    fireEvent.press(getByTestId("등록"));

    // 등록 후, Form이 닫히고, 문의 목록에 추가된다.
    await waitFor(() => {
      expect(getByText("[기타] 샘플 제목")).toBeTruthy();
    });
  });

  it("새 문의 생성 (로그인 한 유저 with query client cache)", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: 4,
        title: "샘플 제목",
        category: "기타",
        status: "신규",
        created_at: "2023-10-04T12:00:00Z",
        is_updated: true,
      },
    });
    const testClient = createTestQueryClient();
    testClient.setQueryData(["inquiries"], sampleInquiries);

    const { getByTestId, getByText } = renderWithProviders(<InquiriesPage />, {
      client: testClient,
    });

    // Form을 채우고 등록 버튼을 누른다.
    fireEvent.press(getByTestId("1:1 문의하기"));
    fireEvent.changeText(getByTestId("title-input"), "샘플 제목");
    fireEvent.changeText(getByTestId("content-input"), "샘플 내용");
    fireEvent.press(getByTestId("term-accept-checkbox"));
    fireEvent.press(getByTestId("등록"));

    // 등록 후, Form이 닫히고, 문의 목록에 추가된다.
    await waitFor(() => {
      expect(getByText("[기타] 샘플 제목")).toBeTruthy();
    });
  });

  it("새 문의 생성 (비로그인 유저)", async () => {
    jest.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: false,
      user: null,
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
      mode: "GUEST",
    });

    const { getByTestId, queryByText } = renderWithProviders(<InquiriesPage />);

    fireEvent.press(getByTestId("1:1 문의하기"));

    // 비로그인한 유저는 고객정보를 입력할 수 있다.
    expect(getByTestId("name-input")).toHaveProp("editable", true);
    expect(getByTestId("email-input")).toHaveProp("editable", true);

    // 필드를 채운다.
    fireEvent.changeText(getByTestId("name-input"), "샘플 이름");
    fireEvent.changeText(getByTestId("email-input"), "test@email.com");
    fireEvent.changeText(getByTestId("title-input"), "샘플 제목");
    fireEvent.changeText(getByTestId("content-input"), "샘플 내용");
    fireEvent.press(getByTestId("term-accept-checkbox"));

    // 실패 사례 테스트 2: 알 수 없는 에러
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(false);
    jest.spyOn(axios, "post").mockRejectedValueOnce({});
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "등록 실패",
          message: "문의를 등록하는데 실패했습니다. 잠시 후 다시 시도해주세요.",
        })
      );
    });

    // 성공 사례 테스트:
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: {
        id: 4,
        title: "샘플 제목",
        category: "기타",
        status: "신규",
        created_at: "2023-10-04T12:00:00Z",
        is_updated: true,
      },
    });
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "등록 완료",
          message: "문의가 등록되었습니다. 답변을 기다려주세요.",
        })
      );
    });
    expect(queryByText("[기타] 샘플 제목")).toBeFalsy();
  });
});
