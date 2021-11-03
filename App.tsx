import React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import {AmplifyTheme} from './components/utils/AmplifyStyleSheet'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import MainStackNavigator from "./components/MainStackNavigator";
// @ts-ignore
import {Authenticator} from 'aws-amplify-react-native'
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import { UserProvider } from "./components/utils/User";


const Drawer = createDrawerNavigator();
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
  ],
}
  
function App() {
  return (
    
    <UserProvider>
      
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
      </UserProvider>
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



export default withAuthenticator(App);
