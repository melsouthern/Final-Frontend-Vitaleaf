import React from 'react';
import { View, Text } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

function CalendarScreen(props:any) {
  const { route } = props
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Calendar</Text>
        <Calendar></Calendar>
      </View>
    );
  }

  export default CalendarScreen