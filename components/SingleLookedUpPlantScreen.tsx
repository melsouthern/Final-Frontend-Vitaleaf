import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { getSinglePlant, postUserPlantToDatabase } from "./utils/Api";
import { getPlants } from "./utils/Api";
import { Image } from "react-native-elements";
import { Button } from "react-native-elements";
import { ActivityIndicator, Colors, TextInput } from "react-native-paper";
import { UserContext, UserProvider } from "./utils/User";
import Icon from "react-native-vector-icons/FontAwesome";
import { objectLessAttributes } from "@aws-amplify/core";

const SingleLookedUpPlantScreen = (props: any) => {
  const { route, navigation } = props;
  const [singlePlant, setSinglePlant] = useState({});
  const [text, setText] = useState("")
  // const mounted = useRef(false);
  const [clicked, setClicked] = useState(false)
  const [plantToPost, setPlantToPost] = useState({
    commonName: "",
    nickName: "",
    image: "",
    nextWatering: "",
    lastWatered: "",
  });

  const { commonName } = props.route.params;
  const { userName } = useContext(UserContext);
  const imageSource = singlePlant.image_url;

  useEffect(() => {
    getSinglePlant(commonName)
      .then((response) => {
        setSinglePlant(response);
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  }, []);

  function handleAddToInventory (singlePlant: object) {
    
    setPlantToPost({
      commonName: singlePlant.commonName,
      nickName: text,
      image: imageSource,
      nextWatering: "",
      lastWatered: "",
    })
    setClicked(true)
  }
  
  useEffect(() => {
    if( clicked ) postUserPlantToDatabase(userName, plantToPost)
    .then(() => {
      navigation.navigate("Main", {screen: 'Home'});
    })
  setClicked(false)}, [plantToPost]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: imageSource }}
          style={{ width: 250, height: 250, borderRadius: 100 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.title}> {singlePlant.commonName} </Text>
        <Text style={styles.subtitle}> {singlePlant.botanicalName} </Text>
        <Text style={styles.description}> {singlePlant.description} </Text>
        
        <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        placeholder={"Please insert nickname"}
      />
        <Button
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Add To Inventory"
          onPress={() => handleAddToInventory(singlePlant)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: 200,
  },
  header: {
    flex: 1,
  },
  section: {
    flex: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
  },
  description: {
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 20,
    lineHeight: 20,
  },
});

export default SingleLookedUpPlantScreen;
