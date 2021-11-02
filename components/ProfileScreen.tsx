import React from 'react';
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import SingleLookedUpPlantScreen from './SingleLookedUpPlantScreen';

const Stack = createStackNavigator()

function ProfileScreen(props: any) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Page</Text>
        <Text>User Profile Here</Text>

        
      </View>
    );
  }

  export default ProfileScreen