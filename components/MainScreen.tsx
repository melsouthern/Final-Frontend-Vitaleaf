import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CameraScreen from './CameraScreen';
import LightMeterScreen from './LightMeterScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import  HomeScreen  from './HomeScreen';

export function MainScreen(props: any) {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
            <Tab.Screen name='Calendar' component={CalendarScreen} options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }} />
            <Tab.Screen name='Search' component={SearchScreen} options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }} />
            <Tab.Screen name='Camera' component={CameraScreen} options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }} />
            <Tab.Screen name='Light Meter' component={LightMeterScreen} options={{
          tabBarLabel: 'Light Meter',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={26} />
          ),
        }} />   
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});