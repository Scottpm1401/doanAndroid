import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from 'app/modules/home';
import React from 'react';

const Stack = createNativeStackNavigator();

const NestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={HomePage} />
    </Stack.Navigator>
  );
};

export default NestNavigator;
