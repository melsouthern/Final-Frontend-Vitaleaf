import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { TabStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;