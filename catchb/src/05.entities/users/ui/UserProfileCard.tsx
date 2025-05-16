import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { UserProfileType } from "@shared/lib/auth";
import { useColors, ThemeColorType } from "@shared/lib/colors";

interface Props {
  profile: UserProfileType;
}

export function UserProfileCard({ profile }: Readonly<Props>) {
  const { colors } = useColors();
  const styles = createStyles(colors);

  return (
    <LinearGradient
      colors={["#00BF60", "#00592D"]}
      start={[0, 1]}
      end={[1, 0]}
      style={styles.name}
    >
      <Text style={styles.nameText}>{profile.name}</Text>
    </LinearGradient>
  );
}

const createStyles = (theme: ThemeColorType) =>
  StyleSheet.create({
    name: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -36,
      paddingVertical: 12,
      backgroundColor: theme.primary,
      borderRadius: 24,
    },
    nameText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.background,
    },
  });
