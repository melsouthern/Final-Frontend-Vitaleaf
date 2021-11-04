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
import SingleCategoryPlantScreen from './SingleCategoryPlantScreen';
import {
      getFocusedRouteNameFromRoute,
  } from '@react-navigation/native';

const Stack = createStackNavigator()

function getHeaderTitle(route:object) {
    // In case the focused route is not found, assume it's the first screen
    return getFocusedRouteNameFromRoute(route) ?? 'Home';
  }

function MainStackNavigator() {
  return (
    
      <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerStyle: {
          backgroundColor: '#3564c8'
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: '#ffffff'
      }}>
        <Stack.Screen name='Home' component={MainTabNavigator} options={({route}) => ({
          title: getHeaderTitle(route),
        })}  />
        {/* <Stack.Screen name='Calendar' component={CalendarScreen} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='Light Meter' component={LightMeterScreen} /> */}
        <Stack.Screen name="Single Looked Up Plant" component={SingleLookedUpPlantScreen}  />
        <Stack.Screen name="Single Plant Category" component={SingleCategoryPlantScreen}  />
      </Stack.Navigator>
    
  )
}

export default MainStackNavigator