import { TabsLayout } from "./TabsLayout";
import * as AuthContext from "@contexts/auth";
import { defaultAuthContext } from "@testdata/contexts";
import { renderWithProviders } from "@utils/test-utils";

describe("<TabsLayout />", () => {
  it("renders normal mode correctly", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({ ...defaultAuthContext, mode: "normal" });

    renderWithProviders(<TabsLayout />);
  });

  it("renders pro mode correctly", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({ ...defaultAuthContext, mode: "pro" });

    renderWithProviders(<TabsLayout />);
  });
});
