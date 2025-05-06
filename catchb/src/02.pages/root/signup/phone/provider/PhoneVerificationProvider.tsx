import { useContext, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";

import {
  PhoneVerificationContext,
  PhoneVerificationContextType,
} from "./context";
import { useSignup } from "@features/signup/common";
import {
  useRequestCode,
  useVerifyCode,
} from "@features/signup/verify-phonenumber";
import { useAlert } from "@shared/lib/alert";

export function PhoneVerificationProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [name, setName] = useState<string>("");
  const [phoneNumberMiddle, setPhoneNumberMiddle] = useState<string>("");
  const [phoneNumberLast, setPhoneNumberLast] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const [sent, setSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const { showAlert } = useAlert();
  const { setNamePhone, data } = useSignup();
  const { mutate: requestCode } = useRequestCode();
  const { mutate: verifyCode } = useVerifyCode();

  const sendRequest = () => {
    setError("");

    const phoneNumber = `010-${phoneNumberMiddle}-${phoneNumberLast}`;
    requestCode(
      {
        phone: phoneNumber,
      },
      {
        onSuccess: () => {
          setSent(true);
          setTimer(180);
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            setError(errorMessage);
          } else {
            setError("오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  const checkCode = () => {
    setError("");

    const phoneNumber = `010-${phoneNumberMiddle}-${phoneNumberLast}`;
    verifyCode(
      {
        phone: phoneNumber,
        code: codeInput,
      },
      {
        onSuccess: () => {
          setVerified(true);
          setError("");
          setNamePhone(name, phoneNumber);
          showAlert({
            title: "인증 성공",
            message: "전화번호 인증이 완료되었습니다.",
          });
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;
            setError(errorMessage);
          } else {
            setError("오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    if (data.mode === "naver") {
      setName(data.name);
    }
  }, [data]);

  const value = useMemo<PhoneVerificationContextType>(
    () => ({
      name,
      phoneNumberMiddle,
      phoneNumberLast,
      codeInput,
      verified,
      sent,
      timer,
      error,
      setName,
      setPhoneNumberMiddle,
      setPhoneNumberLast,
      setCodeInput,
      sendRequest,
      checkCode,
    }),
    [
      name,
      phoneNumberMiddle,
      phoneNumberLast,
      codeInput,
      verified,
      sent,
      timer,
      error,
    ]
  );

  return (
    <PhoneVerificationContext.Provider value={value}>
      {children}
    </PhoneVerificationContext.Provider>
  );
}

export function usePhoneVerification() {
  const context = useContext(PhoneVerificationContext);
  if (!context) {
    throw new Error(
      "usePhoneVerification must be used within a PhoneVerificationProvider"
    );
  }
  return context;
}
