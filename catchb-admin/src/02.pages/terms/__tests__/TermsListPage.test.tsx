import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { TermsListPage } from "../ui/TermsList/TermsListPage";
import { sampleTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermsListPage", () => {
  it("renders and navigate correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: sampleTerms });

    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <TermsListPage />
    );

    expect(getByText("약관 관리")).toBeInTheDocument();

    fireEvent.click(getByTestId("전체-tab"));
    await waitFor(() => {
      expect(getByText("Terms of Service")).toBeInTheDocument();
      expect(getByText("Privacy Policy")).toBeInTheDocument();
      expect(queryByText("Term 3")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("유효-tab"));
    await waitFor(() => {
      expect(getByText("Terms of Service")).toBeInTheDocument();
      expect(getByText("Privacy Policy")).toBeInTheDocument();
      expect(queryByText("Term 3")).not.toBeInTheDocument();
    });

    fireEvent.click(getByTestId("무효-tab"));
    await waitFor(() => {
      expect(getByText("Term 3")).toBeInTheDocument();
      expect(queryByText("Terms of Service")).not.toBeInTheDocument();
      expect(queryByText("Privacy Policy")).not.toBeInTheDocument();
    });

    fireEvent.click(getByText("추가"));
    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/terms/create");
    });

    fireEvent.click(getByTestId("term-3"));
    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/terms/3");
    });
  });

  it("handles API error", async () => {
    vi.spyOn(axios, "get").mockRejectedValue({error: "API Error"});
    vi.spyOn(window, "alert").mockImplementation(() => {});

    renderWithProviders(<TermsListPage />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "약관 목록을 불러오는 데 실패했습니다."
      );
    });
  });
});
