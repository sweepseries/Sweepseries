import axios from "axios";

import { catchBLogin } from "@entities/auth";

describe("catchBLogin", () => {
  it("should return data on successful login", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {},
    });

    const result = await catchBLogin("username", "password");

    expect(result).toEqual({});
  });

  it("should handle catchBlogin failure", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({});

    const result = await catchBLogin("username", "password");

    expect(result).toBeNull();
  });
});
