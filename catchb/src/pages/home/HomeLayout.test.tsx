import { HomeLayout } from "./HomeLayout";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@features/CatchB", () => ({
  CatchBLogo: () => <></>,
}));

describe("<HomeLayout />", () => {
  it("renders correctly", () => {
    renderWithProviders(<HomeLayout />);
  });
});
