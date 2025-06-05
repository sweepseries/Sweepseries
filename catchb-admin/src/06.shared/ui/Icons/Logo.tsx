import SweepSeriesLogo from "./files/sweepseries.svg?react";
import SweepSeriesHorizontalLogo from "./files/sweep_horizontal.svg?react";

interface Props {
  size?: number;
  horizontal?: boolean;
}

export function Logo({ size = 160, horizontal = false }: Readonly<Props>) {
  if (horizontal) {
    return <SweepSeriesHorizontalLogo height={size} width="80%" />;
  }

  return <SweepSeriesLogo width={size} height={size} />;
}
