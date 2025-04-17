import { Divider, VerticalDivider } from "./Divider";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Dividers");

describe("<Divider>", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <Divider />
        <Divider bold />
        <Divider color="red" />
      </>
    );
  });
});

describe("<VerticalDivider>", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <VerticalDivider width={1} />
        <VerticalDivider width={1} color="red" />
      </>
    );
  });
});
