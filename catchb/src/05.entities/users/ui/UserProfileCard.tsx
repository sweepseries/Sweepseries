import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import DefaultProfile from "./files/default_profile.svg";
import { UserProfileType } from "@shared/lib/auth";
import { useColors, ThemeColorType } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  profile: UserProfileType;
  editPress: () => void;
}

export function UserProfileCard({ profile, editPress }: Readonly<Props>) {
  const { colors } = useColors();
  const styles = createStyles(colors);

  return (
    <View>
      <View style={styles.imageWrapper}>
        {profile.profile_image ? (
          <Image style={styles.image} source={profile.profile_image} />
        ) : (
          <View
            style={[styles.iconWrapper, { backgroundColor: profile.color }]}
          >
            <DefaultProfile width={135} height={135} />
          </View>
        )}
      </View>
      <LinearGradient
        colors={["#00BF60", "#00592D"]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.name}
      >
        <Text style={styles.nameText}>{profile.name}</Text>
      </LinearGradient>
      <TouchableOpacity
        style={styles.edit}
        onPress={editPress}
        activeOpacity={0.75}
        testID="edit-profile"
      >
        <AppIcon icon="pencil" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: ThemeColorType) =>
  StyleSheet.create({
    imageWrapper: {
      padding: 8,
      borderRadius: "50%",
      borderWidth: 10,
      borderColor: theme.border,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    iconWrapper: {
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    name: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -32,
      paddingHorizontal: 48,
      paddingVertical: 12,
      backgroundColor: theme.primary,
      borderRadius: 24,
    },
    nameText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.background,
    },
    edit: {
      position: "absolute",
      right: 0,
      top: 20,
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      backgroundColor: theme.background,
      borderRadius: 20,
      borderWidth: 0.25,
      borderColor: theme.border,
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0.5,
        height: 0.5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  });
