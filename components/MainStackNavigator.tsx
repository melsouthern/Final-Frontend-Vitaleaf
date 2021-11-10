import React from "react";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import CalendarScreen from "./InventoryScreen";
import MainTabNavigator from "./MainTabNavigator";
import SearchScreen from "./SearchScreen";
import CameraScreen from "./CameraScreen";
import LightMeterScreen from "./LightMeterScreen";
import SingleLookedUpPlantScreen from "./SingleLookedUpPlantScreen";
import SingleCategoryPlantScreen from "./SingleCategoryPlantScreen";
import SearchedForPlants from "./SearchedForPlants";
import SingleUserPlant from "./SingleUserPlant";
import { Image, StyleSheet, Text, View } from "react-native";
import vitaleafNarrow from "../assets/vitaleafNarrow3.png";
import { useContext } from "react";
import { UserContext } from "./utils/User";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

function getHeaderTitle(route: object) {
  // In case the focused route is not found, assume it's the first screen
  return getFocusedRouteNameFromRoute(route) ?? "Home";
}

function MainStackNavigator() {
  const { userName } = useContext(UserContext);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",

        headerStyle: {
          backgroundColor: "#17B890",
        },
        headerBackground: () => (
          <Image
            style={{ flex: 1, height: 25, width: 380 }}
            source={vitaleafNarrow}
          />
        ),

        headerTitleStyle: {
          fontFamily: "Futura",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={({ route }) => ({
          title: getHeaderTitle(route),
        })}
      />

      <Stack.Screen
        name="Single Looked Up Plant"
        component={SingleLookedUpPlantScreen}
      />
      <Stack.Screen
        name="Single Plant Category"
        component={SingleCategoryPlantScreen}
      />
      <Stack.Screen name="Searched For Plants" component={SearchedForPlants} />
      <Stack.Screen name="Single User Plant" component={SingleUserPlant} options={({ route }) => ({
          title: `${userName}'s Plant`,
        })}/>
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
