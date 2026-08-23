import { Tabs } from 'expo-router';
import { Text, type ColorValue } from 'react-native';

import { colors } from '@/src/theme';

function TabMark({ label, color }: { label: string; color: ColorValue }) {
  return (
    <Text style={{ color, fontSize: 10, fontWeight: '800', letterSpacing: 0.4 }}>{label}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.line,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Term',
          tabBarIcon: ({ color }) => <TabMark label="TERM" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wire"
        options={{
          title: 'Wire',
          tabBarIcon: ({ color }) => <TabMark label="WIRE" color={color} />,
        }}
      />
      <Tabs.Screen
        name="brief"
        options={{
          title: 'Brief',
          tabBarIcon: ({ color }) => <TabMark label="BRIEF" color={color} />,
        }}
      />
      <Tabs.Screen
        name="desk"
        options={{
          title: 'Desk',
          tabBarIcon: ({ color }) => <TabMark label="DESK" color={color} />,
        }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: 'Charts',
          tabBarIcon: ({ color }) => <TabMark label="CHART" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Watch',
          tabBarIcon: ({ color }) => <TabMark label="WATCH" color={color} />,
        }}
      />
    </Tabs>
  );
}
