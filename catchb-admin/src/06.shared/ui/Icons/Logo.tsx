import SweepSeriesLogo from "./files/sweepseries.svg?react";

interface Props {
  size?: number;
}

export function Logo({ size = 160 }: Readonly<Props>) {
  return <SweepSeriesLogo width={size} height={size} />;
}
