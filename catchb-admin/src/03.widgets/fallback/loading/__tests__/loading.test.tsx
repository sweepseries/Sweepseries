import { describe, it } from "vitest";

import {
  LoadingList,
  LoadingSpinner,
  LoadingTabs,
  LoadingTitleAndContentModal,
} from "@widgets/fallback/loading";
import { renderWithProviders } from "@test-utils/renderer";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingSpinner />);
  });
});

describe("LoadingList", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingList />);
  });
});

describe("LoadingTabs", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingTabs />);
  });
});

describe("LoadingTitleAndContentModal", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingTitleAndContentModal />);
  });
});
