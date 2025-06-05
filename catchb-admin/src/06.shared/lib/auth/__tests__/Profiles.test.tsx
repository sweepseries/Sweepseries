import { describe, expect, it, vi } from "vitest";

import {
  AnonymousUserProfile,
  UserProfile,
  sampleUserProfile,
  sampleAnonymousUserProfile,
} from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

describe("Auth Profiles", () => {
  it("renders UserProfile", () => {
    const { getByText } = renderWithProviders(
      <UserProfile user={sampleUserProfile} />
    );
    expect(getByText(sampleUserProfile.name)).toBeInTheDocument();
  });

  it("renders UserProfile with no profile image", () => {
    const { getByText } = renderWithProviders(
      <UserProfile user={{ ...sampleUserProfile, profile_image: "" }} />
    );
    expect(getByText(sampleUserProfile.name)).toBeInTheDocument();
  });

  it("renders AnonymousUserProfile", () => {
    const { getByText } = renderWithProviders(
      <AnonymousUserProfile user={sampleAnonymousUserProfile} />
    );
    expect(getByText(sampleAnonymousUserProfile.name)).toBeInTheDocument();
  });
});
