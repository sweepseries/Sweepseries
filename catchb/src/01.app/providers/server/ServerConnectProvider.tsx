import { useEffect, useState } from "react";
import * as Network from "expo-network";

import { initialize } from "./api";
import { useAlert } from "@shared/lib/alert";

type ConnectionStatus = "CHECKING" | "OFFLINE" | "SERVER-DOWN" | "ONLINE";

interface Props {
  children: React.ReactNode;
}

export function ServerConnectProvider({ children }: Readonly<Props>) {
  const [status, setStatus] = useState<ConnectionStatus>("CHECKING");

  const { showAlert } = useAlert();

  useEffect(() => {
    const initializeSocialLogin = async () => {
      const response = await initialize();

      if (response === "SUCCESS") {
        setStatus("ONLINE");
      } else {
        setStatus("SERVER-DOWN");
        showAlert({
          title: "서버 연결 오류",
          message: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    };

    const checkConnection = async () => {
      const net = await Network.getNetworkStateAsync();

      if (!net.isConnected || !net.isInternetReachable) {
        setStatus("OFFLINE");
        showAlert({
          title: "네트워크 연결 없음",
          message: "네트워크 연결을 확인해주세요.",
        });
        return;
      }

      initializeSocialLogin();
    };

    checkConnection();
  }, []);

  if (status !== "ONLINE") {
    return null;
  }

  return children;
}
