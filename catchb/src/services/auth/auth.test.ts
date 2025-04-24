import axios from "axios";

import { login, logout, refresh } from "./auth";

describe("login", () => {
  it("should return data on successful login", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const result = await login("uesr", "1234");
    expect(result).toEqual({});
  });

  it("should return null on failed login", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error("Login failed"));

    const result = await login("user", "1234");
    expect(result).toBeNull();
  });
});

describe("logout", () => {
  it("should return true on successful logout", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({});

    const result = await logout();
    expect(result).toBe(true);
  });

  it("should return false on failed logout", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error("Logout failed"));

    const result = await logout();
    expect(result).toBe(false);
  });
});

describe("refresh", () => {
  it("should return data on successful refresh", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const result = await refresh();
    expect(result).toEqual({});
  });

  it("should return null on failed refresh", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error("Refresh failed"));

    const result = await refresh();
    expect(result).toBeNull();
  });
});
