import React from 'react';
import { View, Text } from "react-native";


function NewuserGreeting() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>New user</Text>
        <Text>Greetings new user, welcome to our app</Text>
      </View>
    );
}

export default NewuserGreeting;