import { Tabs } from "expo-router";

import { useAuth } from "@shared/lib/auth";
import { AppIcon } from "@shared/ui/Icons";
import { useColors } from "@shared/lib/colors";

export const unstable_settings = {
  initialRouteName: "home",
};

export function TabsLayout() {
  const { mode } = useAuth();
  const { colors } = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lowEmphasis,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <AppIcon icon="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="front"
        options={{
          title: "프론트",
          tabBarIcon: ({ color }) => <AppIcon icon="desk" color={color} />,
          href: mode === "PRO" ? "/front" : null,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "캘린더",
          tabBarIcon: ({ color }) => (
            <AppIcon icon="calendar-number" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
          tabBarIcon: ({ color }) => <AppIcon icon="people" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "MY",
          tabBarIcon: ({ color }) => (
            <AppIcon icon="person-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
