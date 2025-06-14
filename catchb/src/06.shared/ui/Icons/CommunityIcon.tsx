import { SvgProps } from "react-native-svg";

import KBO from "./files/KBO.svg";
import MLB from "./files/MLB.svg";
import DOOSAN from "./files/DOOSAN.svg";
import HANWHA from "./files/HANWHA.svg";
import KIA from "./files/KIA.svg";
import KIWOOM from "./files/KIWOOM.svg";
import KT from "./files/KT.svg";
import LG from "./files/LG.svg";
import LOTTE from "./files/LOTTE.svg";
import NC from "./files/NC.svg";
import SAMSUNG from "./files/SAMSUNG.svg";
import SSG from "./files/SSG.svg";

interface Props {
  icon: string;
  height?: number;
  width?: number;
}

export function CommunityIcon({
  icon,
  height = 24,
  width = 40,
}: Readonly<Props>) {
  const iconMap: Record<string, React.FC<SvgProps>> = {
    KBO,
    MLB,
    DOOSAN,
    HANWHA,
    KIA,
    KIWOOM,
    KT,
    LG,
    LOTTE,
    NC,
    SAMSUNG,
    SSG,
  };

  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      height={height}
      width={width}
      preserveAspectRatio="xMinYMid meet"
    />
  );
}
