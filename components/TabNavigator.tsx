import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack"; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import HomeScreen from './HomeScreen'
import CalendarScreen from './CalendarScreen'
import SearchScreen from './SearchScreen'
import LightMeterScreen from './LightMeterScreen'
import { MainStackNavigator, TabStackNavigator } from "./StackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainStackNavigator}/>
            <Tab.Screen name="Search" component={MainStackNavigator}/>
            <Tab.Screen name="Calendar" component={TabStackNavigator}/> 
             <Tab.Screen name="LightMeter" component={TabStackNavigator}/>
        </Tab.Navigator>

    )
}
export {BottomTabNavigator}