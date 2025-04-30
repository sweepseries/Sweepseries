import { fireEvent } from "@testing-library/react-native";

import { MyPage } from "./MyPageMain";
import { renderWithProviders } from "@utils/test-utils";

describe("<MyPage />", () => {
  it("renders and handles link clicks correctly", () => {
    const { getByText } = renderWithProviders(<MyPage />);

    fireEvent.press(getByText("개인정보 처리방침"));
    fireEvent.press(getByText("이용약관"));
  });
});
