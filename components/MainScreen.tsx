import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CameraScreen from './CameraScreen';
import LightMeterScreen from './LightMeterScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import  HomeScreen  from './HomeScreen';
import MainStackNavigator from './MainStackNavigator';

export function MainScreen(props: any) {
    const Tab = createMaterialBottomTabNavigator();
    return (
        
        <MainStackNavigator />
        
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