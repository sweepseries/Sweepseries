import { StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { useSwitchProfile } from "../hooks/useSwitchProfile";
import {
  CommunityProfile,
  CommunityProfileType,
  useCommunityProfiles,
} from "@entities/community-profiles";
import { ThemeColorType, useColors } from "@shared/lib/colors";

export function SwitchProfileSheet() {
  const { activeProfile, switchProfile, profiles } = useCommunityProfiles();
  const { toggleSheet } = useSwitchProfile();
  const { colors } = useColors();
  const styles = sheetStyles(colors);

  const onProfilePress = (profile: CommunityProfileType) => {
    switchProfile(profile);
    toggleSheet();
  };

  return (
    <BottomSheetView style={styles.container}>
      {profiles.map((profile) => (
        <TouchableOpacity
          key={profile.id}
          onPress={() => onProfilePress(profile)}
          style={[
            profile.id === activeProfile?.id ? styles.activeProfile : null,
          ]}
          testID={`profile-${profile.id}`}
        >
          <CommunityProfile key={profile.id} profile={profile} />
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
}

const sheetStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom: 8,
      gap: 8,
    },
    activeProfile: {
      backgroundColor: colors.primary,
    },
  });
