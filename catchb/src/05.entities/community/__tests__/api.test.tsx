import axios from "axios";

import { initializeCommunity } from "../api/initialize";
import { sampleCommunityInitializerResponse } from "../models/testdata";

jest.unmock("@entities/community/api/initialize");

describe("Community API Initialization", () => {
  it("should initialize community data", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: sampleCommunityInitializerResponse });

    const response = await initializeCommunity();
    expect(response).toEqual(sampleCommunityInitializerResponse);
    expect(axios.get).toHaveBeenCalledWith("/v1/community/initialize/");
  });

  it("should handle errors gracefully", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));
    const response = await initializeCommunity();

    expect(response).toEqual(null);
    expect(axios.get).toHaveBeenCalledWith("/v1/community/initialize/");
  });
});
