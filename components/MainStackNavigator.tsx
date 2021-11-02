import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchScreen from './SearchScreen';
import CameraScreen from './CameraScreen';
import LightMeterScreen from './LightMeterScreen';
import SingleLookedUpPlantScreen from './SingleLookedUpPlantScreen';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    
      <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: '#101010'
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: '#ffd700'
      }}>
        <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown:false}}  />
        <Stack.Screen name='Calendar' component={CalendarScreen} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='Light Meter' component={LightMeterScreen} />
        <Stack.Screen name="Single Looked Up Plant" component={SingleLookedUpPlantScreen}  />
      </Stack.Navigator>
    
  )
}

export default MainStackNavigator