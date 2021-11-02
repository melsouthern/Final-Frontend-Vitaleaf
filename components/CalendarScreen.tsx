import React from 'react';
import { View, Text } from "react-native";

function CalendarScreen(props:any) {
  const { route } = props
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Calendar</Text>
      </View>
    );
  }

  export default CalendarScreen