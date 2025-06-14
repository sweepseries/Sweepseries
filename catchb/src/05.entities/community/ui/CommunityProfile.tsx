import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { CommunityProfileType } from "../models/types";
import { DefaultProfile } from "@shared/ui/Icons";

interface Props {
  profile: CommunityProfileType | null;
  size?: number;
}

/**
 * 커뮤니티 프로필 컴포넌트.
 * 프로필 이미지가 있으면 해당 이미지를 표시하고,
 * 없으면 기본 프로필 아이콘과 프로필 색상을 사용하여 표시.
 *  기본 크기는 35px이며, 필요에 따라 변경 가능.
 * 프로필이 없는 경우는 로그인이 되어있지 않은 경우밖에 없음.
 */

export function CommunityProfile({ profile, size = 35 }: Readonly<Props>) {
  if (!profile) {
    return null;
  }

  return (
    <View>
      {profile.profile_image ? (
        <Image
          style={[styles.image, { width: size, height: size }]}
          source={profile.profile_image}
        />
      ) : (
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: profile.color,
              width: size,
              height: size,
            },
          ]}
        >
          <DefaultProfile width={size} height={size} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: "50%",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});
