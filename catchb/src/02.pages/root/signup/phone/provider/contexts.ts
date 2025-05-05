import { createContext } from "react";

export interface PhoneVerificationContextType {
    name: string;
    phoneNumberMiddle: string;
    phoneNumberLast: string;
    codeInput: string;
    verified: boolean;
    sent: boolean;
    timer: number;
    error: string;
    setName: (name: string) => void;
    setPhoneNumberMiddle: (middle: string) => void;
    setPhoneNumberLast: (last: string) => void;
    setCodeInput: (code: string) => void;
    sendRequest: () => void;
    checkCode: () => void;
}

export const PhoneVerificationContext = createContext<
  PhoneVerificationContextType | undefined
>(undefined);
