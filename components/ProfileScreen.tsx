import React from 'react';
import { useState, useContext } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import SingleLookedUpPlantScreen from './SingleLookedUpPlantScreen';
import { UserContext, UserProvider } from "./utils/User";

const Stack = createStackNavigator()

function ProfileScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Page</Text>
        <Text>{userName}'s Profile Here</Text>

        
      </View>
    );
  }

  export default ProfileScreen