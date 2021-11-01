import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from './components/HomeScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import MyTabs from "./components/NavBar";
import { MainStackNavigator } from "./components/StackNavigator";
import { BottomTabNavigator } from "./components/TabNavigator";

const Tab = createMaterialBottomTabNavigator()

const App = () =>{
return(

  <NavigationContainer>

 {/* <MainStackNavigator /> */}
<BottomTabNavigator />

  </NavigationContainer>

)

}
export default App

const styles = StyleSheet.create({

  //styling stuff
})