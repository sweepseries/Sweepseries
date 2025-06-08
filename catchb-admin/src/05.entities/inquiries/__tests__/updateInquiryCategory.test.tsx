import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import {
  sampleInquiryCategories,
  sampleInquiryThreadDetail,
  useUpdateInquiryCategory,
} from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockCategoryUpdateComponent = () => {
  const { mutate } = useUpdateInquiryCategory(1);

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            category_id: sampleInquiryCategories[0].id,
          })
        }
      >
        Update Category
      </button>
      <div>General Inquiry</div>
    </div>
  );
};

describe("UpdateInquiryCategory", () => {
  it("should update inquiry category", async () => {
    const mockUpdate = vi.spyOn(axios, "patch").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });

    const { getByText } = renderWithProviders(<MockCategoryUpdateComponent />);

    fireEvent.click(getByText("Update Category"));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        "/api/admin/v1/inquiries/1/category/",
        { category_id: sampleInquiryCategories[0].id }
      );
    });
  });
});
