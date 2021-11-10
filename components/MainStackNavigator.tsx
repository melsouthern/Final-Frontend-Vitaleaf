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

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

function getHeaderTitle(route: object) {
  // In case the focused route is not found, assume it's the first screen
  return getFocusedRouteNameFromRoute(route) ?? "Home";
}

function MainStackNavigator() {
  

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
<<<<<<< HEAD
        // headerStyle: {
         // backgroundColor: '#17B890'
          
        // },
        headerBackground: () =>(<Image
          style={{flex:1, 
            height: 25, width:380, alignSelf: 'center'
          }}
          source={vitaleafNarrow}
        />),
=======

        headerStyle: {
          backgroundColor: "#17B890",
        },
        headerBackground: () => (
          <Image
            style={{ flex: 1, height: 25, width: 380 }}
            source={vitaleafNarrow}
          />
        ),

>>>>>>> d340842a43f5077b85d98e48050e55df42b601c7
        headerTitleStyle: {
          fontFamily: "Futura",
        },
        headerTintColor: "#ffffff",
      }}
<<<<<<< HEAD
    
      >
        <Stack.Screen name='Main' component={MainTabNavigator} options={({route}) => ({
          title: getHeaderTitle(route),
        })}  />
        
        <Stack.Screen name="Single Looked Up Plant" component={SingleLookedUpPlantScreen} />
        <Stack.Screen name="Single Plant Category" component={SingleCategoryPlantScreen} />
        <Stack.Screen name="Searched For Plants" component={SearchedForPlants} />
        <Stack.Screen name="Single User Plant" component={SingleUserPlant} />
      </Stack.Navigator>
    
  )
=======
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={({ route }) => ({
          //title: getHeaderTitle(route),
          title: null,
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
      <Stack.Screen name="Single User Plant" component={SingleUserPlant} />
    </Stack.Navigator>
  );
>>>>>>> d340842a43f5077b85d98e48050e55df42b601c7
}

export default MainStackNavigator;
