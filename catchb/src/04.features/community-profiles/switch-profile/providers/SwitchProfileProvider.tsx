import { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import {
  SwitchProfileContext,
  type SwitchProfileContextType,
} from "../models/contexts";
import { SwitchProfileSheet } from "../ui/SwitchProfileSheet";

export function SwitchProfileProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ref = useRef<BottomSheet>(null);

  const toggleSheet = () => {
    ref.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const value = useMemo<SwitchProfileContextType>(
    () => ({
      toggleSheet,
    }),
    []
  );

  return (
    <SwitchProfileContext.Provider value={value}>
      {children}
      <BottomSheet ref={ref} index={-1} backdropComponent={renderBackdrop}>
        <SwitchProfileSheet />
      </BottomSheet>
    </SwitchProfileContext.Provider>
  );
}
