import { useEffect, useState } from "react";

import { initialize } from "./api";
import { useAlert } from "@shared/lib/alert";

interface Props {
  children: React.ReactNode;
}

export function ServerConnectProvider({ children }: Readonly<Props>) {
  const [ready, setReady] = useState<boolean>(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    const initializeSocialLogin = async () => {
      const response = await initialize();

      if (response === "SUCCESS") {
        setReady(true);
      }
    };

    initializeSocialLogin();
  }, []);

  if (!ready) {
    showAlert({
      title: "접속상태 이상",
      message:
        "현재 기기 접속 상태가 원활하지 않습니다.\n네트워크 연결 상태를 확인해 주십시오.",
    });
    return null;
  }

  return children;
}
