import React from 'react';
import { View, Text } from "react-native";


const SingleCategoryPlantScreen = (props:any) => {
  const {route} = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Single Plant Category</Text>
        
      </View>
    );
}

export default SingleCategoryPlantScreen