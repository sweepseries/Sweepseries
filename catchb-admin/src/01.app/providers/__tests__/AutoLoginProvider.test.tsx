import { fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { AutoLoginProvider } from "../autologin/provider/AutoLoginProvider";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const testRequest = async () => {
    try {
      await axios.get("/test");
    } catch {
      // Handle error
    }
  };

  return (
    <div>
      <button onClick={testRequest}>Test Request</button>
    </div>
  );
};

describe("AutoLoginProvider", () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onPost("/v1/tokens/refresh/").reply(200, {
      access: "test-token",
    });
  });

  it("test auto login success", () => {
    const { getByText } = renderWithProviders(
      <AutoLoginProvider>
        <MockComponent />
      </AutoLoginProvider>
    );

    waitFor(() => expect(getByText("Authenticated: Yes")).toBeInTheDocument());
  });

  it("test auto login fail", () => {
    mockAxios.onPost("/v1/tokens/refresh/").reply(400);

    const { getByText } = renderWithProviders(
      <AutoLoginProvider>
        <MockComponent />
      </AutoLoginProvider>
    );

    waitFor(() => expect(getByText("Authenticated: No")).toBeInTheDocument());
  });

  it("test auto refresh success", async () => {
    const { getByText } = renderWithProviders(
      <AutoLoginProvider>
        <MockComponent />
      </AutoLoginProvider>
    );

    mockAxios
      .onGet("/test")
      .replyOnce(401, { error: "Access Token이 만료되었습니다." });
    mockAxios.onGet("/test").reply(200, {});

    await waitFor(() => {
      fireEvent.click(getByText("Test Request"));
    });
  });
});
