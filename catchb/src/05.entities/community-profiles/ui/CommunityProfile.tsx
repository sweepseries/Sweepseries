import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { CommunityProfileType } from "../models/types";
import { DefaultProfile } from "@shared/ui/Icons";

interface Props {
  profile: CommunityProfileType | null;
}

export function CommunityProfile({ profile }: Readonly<Props>) {
  if (!profile) {
    return (
      <View>
        <Text>로그인</Text>
      </View>
    );
  }

  return (
    <View>
      {profile.profile_image ? (
        <Image style={styles.image} source={profile.profile_image} />
      ) : (
        <View style={[styles.iconWrapper, { backgroundColor: profile.color }]}>
          <DefaultProfile width={30} height={30} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
