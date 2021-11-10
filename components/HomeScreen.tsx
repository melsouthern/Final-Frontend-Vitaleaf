import React from "react";
import { useState, useContext, useEffect } from "react";
import { configureFonts } from "react-native-paper";
import { Auth } from "aws-amplify";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { UserContext, UserProvider } from "./utils/User";
import { getUserFromDatabase, getUserPlantsFromDatabase } from "./utils/Api";
import { FlatList } from "react-native-gesture-handler";
import { ProgressBar, Colors } from "react-native-paper";
import { ListItem, Avatar } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { white } from "react-native-paper/lib/typescript/styles/colors";

function HomeScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/IMG_0308_5.png")} style={styles.logo} />
      <Text style={styles.title}>a plant management app</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004346",
    paddingTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    flex: 1 / 2,
    fontFamily: "Futura",
    color: "white",
  },
  logo: {
    resizeMode: "contain",
    // aspectRatio: 0.6,
    height: 90,
    width: "70%",
  },
});

export default HomeScreen;
