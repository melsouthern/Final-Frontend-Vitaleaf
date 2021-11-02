import React from 'react';
import { View, Text } from "react-native";


const SingleLookedUpPlantScreen = (props:any) => {
  const {route} = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search for user plant</Text>
        <Text>Search for plant from user collection</Text>
      </View>
    );
}

export default SingleLookedUpPlantScreen