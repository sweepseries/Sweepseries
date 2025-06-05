import { describe, it, expect, vi } from "vitest";

import {
  isAnonymousUser,
  sampleUserProfile,
  sampleAnonymousUserProfile,
} from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

describe("isAnonymousUser", () => {
  it("returns true for anonymous user", () => {
    expect(isAnonymousUser(sampleAnonymousUserProfile)).toBe(true);
  });

  it("returns false for regular user", () => {
    expect(isAnonymousUser(sampleUserProfile)).toBe(false);
  });

  it("returns true for user without uuid", () => {
    const anonymousUser = { ...sampleUserProfile, uuid: "" };
    expect(isAnonymousUser(anonymousUser)).toBe(true);
  });

  it("returns false for user with uuid", () => {
    expect(isAnonymousUser({ ...sampleUserProfile, uuid: "123" })).toBe(false);
  });
});
