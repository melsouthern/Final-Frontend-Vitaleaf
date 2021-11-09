import React from "react";
import { useState, useContext, useEffect } from "react";
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

function HomeScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/IMG_0308_5.png")} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#082d0fff",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004346",
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 15,
  },
  titletext: {
    fontSize: 25,
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    flexDirection: "column",
    // aspectRatio: 0.6,
    height: "100%",
    width: "80%",
  },
});

export default HomeScreen;
