import { render } from "@testing-library/react-native";

import { ThemeProvider } from "../ThemeProvider";

describe("ThemeProvider", () => {
  it("should render children", () => {
    render(
      <ThemeProvider>
        <></>
      </ThemeProvider>
    );
  });
});
