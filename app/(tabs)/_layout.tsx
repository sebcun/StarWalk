import { useColorScheme } from "@/components/useColorScheme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar">
        <Label>Calendar</Label>
        <Icon sf="calendar" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="news">
        <Label>News</Label>
        <Icon sf="newspaper.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="sky">
        <Label>Sky</Label>
        <Icon sf="sparkles" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
