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
          title: 'Today',
          tabBarIcon: ({ color }) => <TabMark label="TODAY" color={color} />,
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
          title: 'Research',
          tabBarIcon: ({ color }) => <TabMark label="NOTE" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <TabMark label="MORE" color={color} />,
        }}
      />
    </Tabs>
  );
}
