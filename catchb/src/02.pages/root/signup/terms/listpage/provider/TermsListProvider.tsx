import { useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";

import { TermsListContext, TermsAndConditionsCheckType } from "./context";
import { useSignup } from "@features/signup/common";
import { useTerms } from "@entities/terms";
import { useAlert } from "@shared/lib/alert";

export function TermsListProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [checkedTerms, setCheckedTerms] = useState<
    TermsAndConditionsCheckType[]
  >([]);
  const [notificationsTermId, setNotificationsTermId] = useState<number>(-1);

  const allChecked = checkedTerms.every((term) => term.is_checked);
  const allRequiredChecked = checkedTerms.every(
    (term) => term.is_checked || !term.is_required
  );

  const { showAlert } = useAlert();
  const { data: terms, isLoading, isError } = useTerms();
  const { setNotificationsAgreed } = useSignup();

  const isTermChecked = (id: number) => {
    const check = checkedTerms.find((check) => check.id === id);

    return check ? check.is_checked : false;
  };

  const toggleCheck = (id: number) => {
    setCheckedTerms(
      checkedTerms.map((check) =>
        check.id === id ? { ...check, is_checked: !check.is_checked } : check
      )
    );

    if (id === notificationsTermId) {
      setNotificationsAgreed(!isTermChecked(id));
    }
  };

  const toggleAll = () => {
    const allChecked = checkedTerms.every((check) => check.is_checked);

    if (allChecked) {
      setCheckedTerms(
        checkedTerms.map((term) => ({ ...term, is_checked: false }))
      );
      setNotificationsAgreed(false);
    } else {
      setCheckedTerms(
        checkedTerms.map((term) => ({ ...term, is_checked: true }))
      );
      setNotificationsAgreed(true);
    }
  };

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "오류 발생",
        message:
          "약관 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        onConfirm: () => {
          router.back();
        },
      });
      return;
    }

    if (!terms) return;

    setCheckedTerms(
      terms.map((term) => ({
        id: term.id,
        is_checked: false,
        is_required: term.is_required,
      }))
    );

    const notificationsTerm = terms.find((term) =>
      term.title.includes("알림 수신 동의")
    );

    setNotificationsTermId(notificationsTerm?.id ?? -1);
  }, [terms, isError, isLoading]);

  const value = useMemo(
    () => ({
      terms,
      isLoading,
      isAllChecked: allChecked,
      buttonActive: allRequiredChecked,
      isTermChecked,
      toggleAll,
      toggleCheckTerm: toggleCheck,
    }),
    [terms, isLoading, allChecked, allRequiredChecked, isTermChecked]
  );

  return (
    <TermsListContext.Provider value={value}>
      {children}
    </TermsListContext.Provider>
  );
}

export const useTermsList = () => {
  const ctx = useContext(TermsListContext);

  if (!ctx) {
    throw new Error("useTermsList must be used within a TermsProvider");
  }
  return ctx;
};
