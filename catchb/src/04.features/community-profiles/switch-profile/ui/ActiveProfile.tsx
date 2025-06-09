import { TouchableOpacity } from "react-native";

import { useSwitchProfile } from "../hooks/useSwitchProfile";
import {
  CommunityProfile,
  useCommunityProfiles,
} from "@entities/community-profiles";

export function ActiveProfile() {
  const { activeProfile } = useCommunityProfiles();
  const { toggleSheet } = useSwitchProfile();

  return (
    <TouchableOpacity onPress={toggleSheet} testID="open-switch-profile-sheet">
      <CommunityProfile profile={activeProfile} />
    </TouchableOpacity>
  );
}
