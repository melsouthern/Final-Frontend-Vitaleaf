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
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";

const Stack = createStackNavigator()

const MainStackNavigator = () => {
    return (
        
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
    
        <Stack.Screen name="Calendar" component={CalendarScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="LightMeter" component={LightMeterScreen}/>
        </Stack.Navigator>
        
        )
}
const TabStackNavigator = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
    
        <Stack.Screen name="Calendar" component={CalendarScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/> 
        <Stack.Screen name="LightMeter" component={LightMeterScreen}/>
        </Stack.Navigator>
    )
}

export {MainStackNavigator, TabStackNavigator}