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
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => <TabMark label="LIVE" color={color} />,
        }}
      />
      <Tabs.Screen
        name="room"
        options={{
          title: 'Room',
          tabBarIcon: ({ color }) => <TabMark label="ROOM" color={color} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color }) => <TabMark label="BOOK" color={color} />,
        }}
      />
      <Tabs.Screen name="brief" options={{ href: null }} />
      <Tabs.Screen name="desk" options={{ href: null }} />
      <Tabs.Screen name="research" options={{ href: null }} />
      <Tabs.Screen name="more" options={{ href: null }} />
    </Tabs>
  );
}
