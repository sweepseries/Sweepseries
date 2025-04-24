import axios from "axios";

import { getTerms, getTermsDetail } from "./terms";
import { sampleTermsAndConditions } from "@testdata/app";

describe("getTerms", () => {
  it("should return terms data", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: sampleTermsAndConditions });

    const result = await getTerms();

    expect(result).toEqual(sampleTermsAndConditions);
  });

  it("should return null on error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Network Error"));

    const result = await getTerms();

    expect(result).toBeNull();
  });
});

describe("getTermsDetail", () => {
  it("should return terms detail data", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: sampleTermsAndConditions[0] });

    const result = await getTermsDetail("1");

    expect(result).toEqual(sampleTermsAndConditions[0]);
  });

  it("should return null on error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Network Error"));

    const result = await getTermsDetail("1");

    expect(result).toBeNull();
  });
});
