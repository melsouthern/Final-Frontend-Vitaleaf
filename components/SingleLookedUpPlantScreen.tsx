import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView,Platform } from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { getSinglePlant, postUserPlantToDatabase } from "./utils/Api";
import { getPlants } from "./utils/Api";
import { Image } from "react-native-elements";
import { Button, colors } from "react-native-elements";
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
    .then((response) => {
      navigation.navigate("Main", {screen: 'Inventory'});
    })
  setClicked(false)}, [plantToPost]);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    
    
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
    
      <View style={styles.container}>
    
      
        <View style={styles.imgContainer}>
        <Image
          source={{ uri: imageSource }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color={Colors.green800}/>}
        />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.plantDesc}>Plant common name:</Text>
        <Text style={styles.title}> {singlePlant.commonName} </Text>
        <Text style={styles.plantDesc}>Plant botanical name:</Text>
        <Text style={styles.subtitle}> {singlePlant.botanicalName} </Text>
        <Text style={styles.description}> {singlePlant.description} </Text>
        </View>
        
        <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        placeholder={"insert plant nickname"}
      />
        <Button
          style={{marginBottom: 20, width: 300}}
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Add To Inventory"
          onPress={() => handleAddToInventory(singlePlant)}
        />
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF5E7",
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    width: 340
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: 300,
  },
  header: {
    flex: 1,
  },
  imgContainer: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
  },
  image: { 
    width: 250, 
    height: 250, 
    borderWidth: 2, 
    borderColor: "#004346", 
    borderRadius: 70, 
    marginTop: 10 
  },
  section: {
    flex: 3,
  },
  title: {
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "700",
    color: "#004346",
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#004346",
  },
  plantDesc: {
    marginTop: 10,
    fontSize: 15,
    color: "grey",
    fontStyle: "italic",
  },
  description: {
    marginTop:10,
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 20,
    lineHeight: 20,
    color: "#004346",
  },
});

export default SingleLookedUpPlantScreen;
