import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import HomePage from '../modules/home';
import RoomNavigator from './nestNavigator';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['/'],
};

const MainNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <RoomNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
