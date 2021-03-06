// @flow

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { INVITE_ACTIVE } from '@/utils/constants';
import Apps from './Apps';
import Connections from './Connections';
import Groups from './Groups';
import Home from './Home';
import Notifications from './Notifications';
import Onboarding from './Onboarding';
import { Icon, IconWithBadge } from './helpers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const notificationCount = useSelector(
    ({ user: { notifications }, groups: { invites } }) =>
      notifications?.length +
      invites?.filter((invite) => invite.state === INVITE_ACTIVE)?.length,
  );
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#4990e2',
        labelPosition: 'below-icon',
        allowFontScaling: false,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: Icon('home', 'home-outline') }}
      />
      <Tab.Screen
        name="Connections"
        component={Connections}
        options={{
          tabBarIcon: Icon(
            'account-arrow-right',
            'account-arrow-right-outline',
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarIcon: Icon('account-group', 'account-group-outline'),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: IconWithBadge('bell', 'bell-outline', notificationCount),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Apps"
        component={Apps}
        options={{ tabBarIcon: Icon('flask', 'flask-outline') }}
      />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  const publicKey = useSelector((state) => state.user.publicKey);
  return (
    <Stack.Navigator>
      {publicKey ? (
        <Stack.Screen
          name="App"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainApp;
