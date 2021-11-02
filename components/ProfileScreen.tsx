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

        <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerStyle: {
          backgroundColor: '#3564c8'
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: '#ffffff'
      }}>
        
        {/* <Stack.Screen name='Calendar' component={CalendarScreen} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='Light Meter' component={LightMeterScreen} /> */}
        <Stack.Screen name="Single Looked Up Plant" component={SingleLookedUpPlantScreen}  />
      </Stack.Navigator>
      </View>
    );
  }

  export default ProfileScreen