import { describe, expect, it } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { NotFoundPage } from "@widgets/fallback/notfound";
import { renderWithProviders } from "@test-utils/renderer";

describe("NotFoundPage", () => {
  it("renders correctly and handle go back", () => {
    const { getByText } = renderWithProviders(<NotFoundPage />);

    fireEvent.click(getByText("뒤로가기"));
    waitFor(() => expect(Router.useNavigate).toHaveBeenCalledWith(-1));
  });
});
