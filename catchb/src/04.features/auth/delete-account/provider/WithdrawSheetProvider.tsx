import { useCallback, useContext, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { WithdrawSheetContext, WithdrawSheetContextType } from "./context";
import { DeleteConfirmSheet } from "../ui/DeleteConfirmSheet";

interface Props {
  children: React.ReactNode;
}

export function WithdrawSheetProvider({ children }: Readonly<Props>) {
  const ref = useRef<BottomSheet>(null);

  const openSheet = () => {
    ref.current?.expand();
  };

  const closeSheet = async () => {
    ref.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="none"
      />
    ),
    []
  );

  const value = useMemo<WithdrawSheetContextType>(
    () => ({
      openSheet,
    }),
    []
  );

  return (
    <WithdrawSheetContext.Provider value={value}>
      {children}
      <BottomSheet ref={ref} index={-1} backdropComponent={renderBackdrop}>
        <DeleteConfirmSheet closeSheet={closeSheet} />
      </BottomSheet>
    </WithdrawSheetContext.Provider>
  );
}

export function useWithdrawSheet() {
  const context = useContext(WithdrawSheetContext);
  if (!context) {
    throw new Error(
      "useWithdrawSheet must be used within a WithdrawSheetProvider"
    );
  }
  return context;
}
