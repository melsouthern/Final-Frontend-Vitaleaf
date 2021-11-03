import React from "react";
import { useState, useContext } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SingleLookedUpPlantScreen from "./SingleLookedUpPlantScreen";
import { UserContext, UserProvider } from "./utils/User";
import { TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "./utils/User";

const Stack = createStackNavigator();

function ProfileScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page</Text>
      <Text>{userName}'s Profile Here</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => signOut()}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ProfileScreen;
