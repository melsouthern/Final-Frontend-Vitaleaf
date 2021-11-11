import React from "react";
import { useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SingleLookedUpPlantScreen from "./SingleLookedUpPlantScreen";
import { UserContext, UserProvider } from "./utils/User";
import { TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "./utils/User";

const Stack = createStackNavigator();

function ProfileScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View>
      <Image
          source={require('../assets/user.png')}
          style={{borderRadius: 150}}
        />
      </View>
      <Text style={styles.text}>Username: {userName}</Text>
      
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
    backgroundColor: "#EFF5E7",
  },
  text: {
    marginTop: 20,
    color: "#004346",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#09BC8A",
    alignSelf: "center",
    alignItems: "center",
    width: "35%",
    borderRadius: 5,
    padding: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
  	height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
    marginTop: 150,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#004346",
  },
});

export default ProfileScreen;
