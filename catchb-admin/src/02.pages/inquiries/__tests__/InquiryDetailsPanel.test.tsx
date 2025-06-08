import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as TipTap from "@tiptap/react";
import * as Router from "react-router";
import axios from "axios";

import { InquiriesDetailPanel } from "../ui/InquiriesDetail/InquiriesDetailPanel";
import {
  sampleInquiryThreadDetail,
  sampleInquiryThreadListResponse,
} from "@entities/inquiries";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

vi.mock("@tiptap/react", () => ({
  useEditor: vi.fn(),
  EditorContent: vi.fn(() => <div>EditorContent</div>),
  Placeholder: {
    configure: vi.fn(() => ({})),
  },
}));

describe("InquiriesDetailPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
    vi.spyOn(TipTap, "useEditor").mockReturnValue(null);
    vi.spyOn(axios, "get").mockResolvedValue({
      data: sampleInquiryThreadDetail,
    });
  });

  it("renders nothing as response form when useEditor returns null", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("text-button-답변 작성하기"));
  });

  it("renders and handles post response fail correctly - no content", async () => {
    vi.spyOn(TipTap, "useEditor").mockReturnValue({
      isEmpty: true,
      getHTML: () => "",
    } as TipTap.Editor);

    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
      expect(
        getByText(
          "You can reset your password by clicking on 'Forgot Password' at the login page."
        )
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("text-button-답변 작성하기"));
    await waitFor(() => {
      expect(getByText("문의에 답변하기")).toBeInTheDocument();
      expect(getByText("EditorToolbar")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("text-button-취소"));
    fireEvent.click(getByTestId("text-button-답변 작성하기"));

    // 1회: 실패 - 내용 없음
    fireEvent.click(getByTestId("text-button-답변 등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("답변 내용을 입력해주세요.");
    });
  });

  it("handles post response correctly", async () => {
    vi.spyOn(TipTap, "useEditor").mockReturnValue({
      isEmpty: false,
      getHTML: () => "<p>Test response</p>",
    } as TipTap.Editor);

    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("text-button-답변 작성하기"));

    // 1회: 실패 - 알 수 없는 오류
    vi.spyOn(axios, "post").mockRejectedValueOnce(new Error("Post Error"));
    fireEvent.click(getByTestId("text-button-답변 등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "답변 등록에 실패했습니다: 알 수 없는 오류"
      );
    });

    // 2회: 실패 - API 에러
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "API Error" } },
    });
    fireEvent.click(getByTestId("text-button-답변 등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "답변 등록에 실패했습니다: 알 수 없는 오류"
      );
    });

    // 3회: 성공
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });
    fireEvent.click(getByTestId("text-button-답변 등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "답변이 성공적으로 등록되었습니다."
      );
    });
  });

  it("renders no notes and handles post notes correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleInquiryThreadDetail, notes: [] },
    });

    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("post-note-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("노트 내용을 입력해주세요.");
    });

    // 1회: 실패 - 알 수 없는 오류
    vi.spyOn(axios, "post").mockRejectedValueOnce(new Error("Post Error"));
    fireEvent.change(getByTestId("inquiry-note-textarea"), {
      target: { value: "This is a test note." },
    });
    fireEvent.click(getByTestId("post-note-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "노트 등록에 실패했습니다: 알 수 없는 오류"
      );
    });

    // 2회: 실패 - API 에러
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "API Error" } },
    });
    fireEvent.click(getByTestId("post-note-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "노트 등록에 실패했습니다: API Error"
      );
    });

    // 3회: 성공
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });
    fireEvent.click(getByTestId("post-note-button"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "노트가 성공적으로 등록되었습니다."
      );
    });
  });

  it("handles update category correctly", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["inquiries"], sampleInquiryThreadListResponse);

    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />,
      {
        client: testClient,
      }
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
    });

    // 1회: pass - 이미 선택된 카테고리
    fireEvent.click(getByTestId("dropdown-item-Technical"));

    // 2회: 실패 - 알 수 없는 오류
    vi.spyOn(axios, "patch").mockRejectedValueOnce(new Error("Update Error"));
    fireEvent.click(getByTestId("dropdown-item-Billing"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "문의 분류를 변경하는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    });

    // 3회: 성공
    vi.spyOn(axios, "patch").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });
    fireEvent.click(getByTestId("dropdown-item-Billing"));
    await waitFor(() => {
      expect(getByText("Billing")).toBeInTheDocument();
    });
  });

  it("handles update status correctly", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["inquiries"], sampleInquiryThreadListResponse);

    const { getByTestId, getByText } = renderWithProviders(
      <InquiriesDetailPanel />,
      {
        client: testClient,
      }
    );

    await waitFor(() => {
      expect(
        getByText("I forgot my password, how can I reset it?")
      ).toBeInTheDocument();
    });

    // 1회: pass - 이미 선택된 상태
    fireEvent.click(getByTestId("dropdown-item-Open"));

    // 2회: 실패 - 알 수 없는 오류
    vi.spyOn(axios, "patch").mockRejectedValueOnce(new Error("Update Error"));
    fireEvent.click(getByTestId("dropdown-item-In Progress"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "문의 상태를 변경하는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    });

    // 3회: 성공
    vi.spyOn(axios, "patch").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });
    fireEvent.click(getByTestId("dropdown-item-In Progress"));
    await waitFor(() => {
      expect(getByText("In Progress")).toBeInTheDocument();
    });
  });

  it("handles initial param error", async () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "invalid" });
    renderWithProviders(<InquiriesDetailPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
      expect(navigateMock).toHaveBeenCalledWith("/inquiries");
    });
  });

  it("handles api error on load", async () => {
    vi.spyOn(axios, "get").mockRejectedValueOnce(new Error("API Error"));
    renderWithProviders(<InquiriesDetailPanel />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "문의 상세 정보를 불러오는 데 실패했습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/inquiries");
    });
  });
});
