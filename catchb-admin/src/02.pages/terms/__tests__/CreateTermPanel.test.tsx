import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { CreateTermPanel } from "../ui/CreateTerm/CreateTermPanel";
import { sampleTerms } from "@entities/terms";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    isAxiosError: vi.fn().mockReturnValue(true),
  };
});

describe("CreateTermPanel", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("fill form and submit successfully", async () => {
    const testClient = createTestQueryClient();
    vi.spyOn(axios, "post").mockResolvedValue({ data: sampleTerms[0] });

    const { getByTestId, getByText } = renderWithProviders(
      <CreateTermPanel />,
      {
        client: testClient,
      }
    );

    expect(getByText("약관 생성")).toBeInTheDocument();

    // fill form
    fireEvent.change(getByTestId("textinput-약관 제목"), {
      target: { value: "Test Term" },
    });
    fireEvent.change(getByTestId("textarea-내용"), {
      target: { value: "This is a test term content." },
    });
    // toggle required checkbox
    fireEvent.click(getByTestId("checkbox-필수 약관"));

    // submit form (fail: unknown error)
    vi.spyOn(axios, "post").mockRejectedValueOnce({});
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 생성에 실패했습니다. 다시 시도해주세요."
      );
    });

    // submit form (success)
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관이 성공적으로 생성되었습니다."
      );
      expect(navigateMock).toHaveBeenCalledWith("/terms/1");
    });
  });

  it("submit fail, then success with query cache", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["terms"], [sampleTerms[1], sampleTerms[2]]);

    const { getByTestId } = renderWithProviders(<CreateTermPanel />, {
      client: testClient,
    });

    // unknown error
    // validation error
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "제목을 입력해주세요." } },
    });
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 생성에 실패했습니다: 제목을 입력해주세요."
      );
    });

    // success
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: sampleTerms[0] });
    fireEvent.click(getByTestId("text-button-등록"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관이 성공적으로 생성되었습니다."
      );
      expect(testClient.getQueryData(["terms"])).toEqual(sampleTerms);
      expect(navigateMock).toHaveBeenCalledWith("/terms/1");
    });
  });
});
