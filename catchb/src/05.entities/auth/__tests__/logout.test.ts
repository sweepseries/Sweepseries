import axios from "axios";

import { logout } from "@entities/auth";

describe("logout", () => {
  it("should return true on successful logout", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({});

    const result = await logout();

    expect(result).toBe(true);
  });

  it("should return false on logout failure", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({});

    const result = await logout();

    expect(result).toBe(false);
  });
});
