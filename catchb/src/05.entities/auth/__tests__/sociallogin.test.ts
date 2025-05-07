import axios from "axios";

import { socialLogin } from "@entities/auth";

describe("socialLogin", () => {
  it("should return data on successful social login", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {},
    });

    const result = await socialLogin("profileId", "naver");

    expect(result).toEqual({});
  });

  it("should handle social login failure", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({});

    const result = await socialLogin("profileId", "naver");

    expect(result).toBeNull();
  });
});
