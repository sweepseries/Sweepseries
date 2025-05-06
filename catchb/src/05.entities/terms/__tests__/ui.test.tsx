import { fireEvent } from "@testing-library/react-native";
import * as Router from "expo-router";

import { CheckAllTerms, TermSimple, sampleTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermSimple", () => {
  it("should render correctly", () => {
    const { getByTestId } = renderWithProviders(
      <>
        <TermSimple
          term={sampleTerms[0]}
          isChecked={true}
          toggleCheck={jest.fn()}
        />
        <TermSimple
          term={sampleTerms[2]}
          isChecked={false}
          toggleCheck={jest.fn()}
        />
      </>
    );

    fireEvent.press(getByTestId("right-1"));
    expect(Router.router.push).toHaveBeenCalledWith(`/signup/terms/1`);
  });
});

describe("CheckAllTerms", () => {
  it("should render checked", () => {
    const { getByTestId } = renderWithProviders(
      <CheckAllTerms checked={true} toggle={jest.fn()} />
    );

    expect(getByTestId("toggle-all")).toBeTruthy();
  });

  it("should render unchecked", () => {
    renderWithProviders(<CheckAllTerms checked={false} toggle={jest.fn()} />);
  });
});
