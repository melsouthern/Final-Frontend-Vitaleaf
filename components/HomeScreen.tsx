import React from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";



function HomeScreen(props: any) {
  const { navigation } = props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Text> User home page with plants</Text>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Calendar')}>
        <Text style={styles.buttonText}>Test Button</Text>
      </TouchableOpacity>
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ebebeb'
    },
    text: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold'
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20
    },
    buttonText: {
      fontSize: 20,
      color: '#fff'
    }
  })

  export default HomeScreen