import { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import {
  SwitchCommunityProfileContext,
  SwitchCommunityProfileContextType,
} from "../models/contexts";
import { MyProfilesSheet } from "../ui/MyProfilesSheet";

export function SwitchCommunityProfileProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const ref = useRef<BottomSheet>(null);

  const openSheet = useCallback(() => {
    ref.current?.expand();
  }, []);

  const closeSheet = () => {
    ref.current?.close();
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

  const value = useMemo<SwitchCommunityProfileContextType>(
    () => ({
      openSheet,
    }),
    [openSheet]
  );

  return (
    <SwitchCommunityProfileContext.Provider value={value}>
      {children}
      <BottomSheet ref={ref} index={-1} backdropComponent={renderBackdrop}>
        <MyProfilesSheet closeSheet={closeSheet} />
      </BottomSheet>
    </SwitchCommunityProfileContext.Provider>
  );
}
