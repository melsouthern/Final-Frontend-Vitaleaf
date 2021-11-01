import React from 'react';
import { Text, View, Button } from "react-native";



function HomeScreen(props: any) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Text> User home page with plants</Text>
        
      </View>
    );
  }

  export default HomeScreen