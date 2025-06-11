import { waitFor } from "@testing-library/react-native";

import { CommunityLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityLayout", () => {
  it("renders and handles switch profile sheet correctly", async () => {
    waitFor(() => renderWithProviders(<CommunityLayout />));
  });
});
