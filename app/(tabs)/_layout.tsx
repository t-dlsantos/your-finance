import { Pressable } from 'react-native';

import { router, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';
import { AddButtom } from '~/components/AddButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarButton: (props) => <Pressable {...props} android_ripple={{foreground: false}}/>,
        headerShadowVisible: false,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: '#161616',
          borderColor: '#353535',
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="wallet" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Add',
          tabBarIcon: () => <AddButtom />,
            tabBarItemStyle: {
            marginBottom: 30,
          },
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/modal');
          },
        })}
      />
      <Tabs.Screen
        name="managment"
        options={{
          title: 'Management',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}