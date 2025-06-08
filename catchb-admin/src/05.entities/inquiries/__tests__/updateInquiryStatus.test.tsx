import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import {
  sampleInquiryStatuses,
  sampleInquiryThreadDetail,
  sampleInquiryThreadListResponse,
  useUpdateInquiryStatus,
} from "@entities/inquiries";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

const MockStatusUpdateComponent = () => {
  const { mutate } = useUpdateInquiryStatus(1);

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            status_id: sampleInquiryStatuses[0].id,
          })
        }
      >
        Update Status
      </button>
      <div>Open</div>
    </div>
  );
};

describe("UpdateInquiryStatus", () => {
  it("should update inquiry status", async () => {
    const mockUpdate = vi.spyOn(axios, "patch").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });

    const { getByText } = renderWithProviders(<MockStatusUpdateComponent />);

    fireEvent.click(getByText("Update Status"));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        "/api/admin/v1/inquiries/1/status/",
        { status_id: sampleInquiryStatuses[0].id }
      );
    });
  });

  it("should update with existing cache", async () => {
    const testClient = createTestQueryClient();
    testClient.setQueryData(["inquiries"], sampleInquiryThreadListResponse);

    const mockUpdate = vi.spyOn(axios, "patch").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });

    const { getByText } = renderWithProviders(<MockStatusUpdateComponent />, {
      client: testClient,
    });

    fireEvent.click(getByText("Update Status"));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        "/api/admin/v1/inquiries/1/status/",
        { status_id: sampleInquiryStatuses[0].id }
      );
    });
  });
});
