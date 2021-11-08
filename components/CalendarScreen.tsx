import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

function CalendarScreen(props:any) {
  const { route } = props
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>My Calendar:</Text>
        <Calendar style={styles.calendar}></Calendar>
      </View>
    );
  }

  const styles = StyleSheet.create({
      calendar: {
        marginTop: 10,
        justifyContent: "center",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      }
  })

  export default CalendarScreen