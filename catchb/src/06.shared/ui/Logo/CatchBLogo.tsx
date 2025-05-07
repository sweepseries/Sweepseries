import MainLogo from "./mainlogo.svg";

interface Props {
  opacity?: number;
}

export function CatchBMainLogo({ opacity = 1 }: Readonly<Props>) {
  return (
    <MainLogo
      width={160}
      height={160}
      fill="#083F25"
      color="#083F25"
      opacity={opacity}
    />
  );
}
