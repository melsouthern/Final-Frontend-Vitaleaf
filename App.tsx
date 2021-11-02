import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import MainStackNavigator from "./components/MainStackNavigator";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
