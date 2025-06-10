import { TouchableOpacity } from "react-native";

import { useSwitchCommunityProfile } from "../hooks/useSwitchCommunityProfile";
import { CommunityProfile, useCommunity } from "@entities/community";

export function ActiveProfile() {
  const { activeProfile } = useCommunity();
  const { openSheet } = useSwitchCommunityProfile();

  return (
    <TouchableOpacity onPress={openSheet} testID="open-switch-profile-sheet">
      <CommunityProfile profile={activeProfile} />
    </TouchableOpacity>
  );
}
