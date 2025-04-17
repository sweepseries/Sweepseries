import { BackButton } from "./BackButton";
import { LoginButton } from "./LoginButtons";
import { TextButton } from "./TextButton";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Buttons");

describe("<BackButton>", () => {
  it("renders correctly", () => {
    renderWithProviders(<BackButton onPress={jest.fn()} />);
  });
});

describe("<LoginButton>", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <LoginButton type="naver" onPress={jest.fn()} />
        <LoginButton type="kakao" onPress={jest.fn()} />
        <LoginButton type="catchb" onPress={jest.fn()} />
      </>
    );
  });
});

describe("<TextButton>", () => {
  it("renders correctly", () => {
    renderWithProviders(<TextButton text="텍스트 버튼" onPress={jest.fn()} />);
  });

  it("renders disabled button", () => {
    renderWithProviders(
      <TextButton text="텍스트 버튼" onPress={jest.fn()} active={false} />
    );
  });
});
