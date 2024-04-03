import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import MusicItems from './Screens/MusicItems';
import Music from './Screens/Music';

export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name="Home" component={Home} />
          <stack.Screen name="MusicItems" component={MusicItems} />
          <stack.Screen name="Music" component={Music} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
