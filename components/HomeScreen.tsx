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
      <Text style={styles.titletext}>vitaleaf</Text>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userPlantView: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: { height: 19.21, width: 100 },
  ratingText: { paddingLeft: 10, color: "grey" },
  scrollView: {
    backgroundColor: "#082d0fff",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1 / 2,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
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
  logo: {},
});

export default HomeScreen;
