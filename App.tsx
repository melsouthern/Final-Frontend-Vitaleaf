import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from "./components/ProfileScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MainScreen } from './components/MainScreen';

const Drawer = createDrawerNavigator();

export default function App() {
	return (
    <SafeAreaProvider>
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home" >
				<Drawer.Screen name="Home" component={MainScreen} />
				<Drawer.Screen name="User Profile" component={ProfileScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
    </SafeAreaProvider>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});