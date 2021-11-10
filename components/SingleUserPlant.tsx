import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { getSingleUserPlantFromDatabase, deleteSinglePlantFromDatabase, getSinglePlant, patchUserPlantWatering } from "./utils/Api";
import { getPlants } from "./utils/Api";
import { Image, Button } from "react-native-elements";
import { ActivityIndicator, Colors, Switch } from "react-native-paper";
import { UserContext, UserProvider } from "./utils/User";
import { DateTime } from "luxon";
import Icon from "react-native-vector-icons/FontAwesome";
import { objectLessAttributes } from "@aws-amplify/core";

const SingleUserPlant = (props: any) => {
  const { route, navigation } = props;
  const [singlePlant, setSinglePlant] = useState({});
  const [databasePlant, setDatabasePlant] = useState({})
  const [isWatered, setIsWatered] = useState(false)
  // const [wateringState, setWateringState] = useState(singlePlant.lastWatered)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
//   const [nickname, setNickName] = useState("")
  const { plant_id, nickName, commonName } = props.route.params;
  const { userName } = useContext(UserContext);
  const imageSource = singlePlant.image;

  useEffect(() => {
    setIsWatered(false)
    getSingleUserPlantFromDatabase(userName, plant_id)
      .then((response) => {
        setSinglePlant(response)
      }).then(() => {
        getSinglePlant(commonName)
        .then((response) => {
          setDatabasePlant(response)
        })
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  }, [isWatered, plant_id, userName]);
  
  function handleRemovePlant() {
    Alert.alert("Delete Plant", `Are you sure you want to Delete ${singlePlant.nickName}?`, [
      {text: "Yes", onPress: () => deleteSinglePlantFromDatabase(userName, plant_id)
      .then((response) => {
          navigation.navigate("Main", {screen: 'Inventory'});
      })},
      {text: "No", onPress: () => {}},
    ])
    
  }

  function handleLastWatered() {
    Alert.alert("Water Plant", `Have you watered ${singlePlant.nickName} on time?`, [
        {text: "Yes", onPress: () => patchUserPlantWatering(userName, plant_id, databasePlant).then(() => {
          setIsWatered(true);
        })},
        {text: "No", onPress: () => {}},
      ])
  }

  const lastWateredDate = new Date (singlePlant.lastWatered)
  const newLastWatered = lastWateredDate.toLocaleDateString('en-GB') 
  const nextWateringDate = new Date (singlePlant.nextWatering)
  const newNextWatering = nextWateringDate.toLocaleDateString('en-GB')

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.subContainer}>
        <Image
          source={{ uri: imageSource }}
          style={{ width: 250, height: 250, borderRadius: 100}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.title}> {singlePlant.nickName} </Text>
          </View>
        <Text style={styles.subtitle}> {singlePlant.commonName} </Text>
        <Text style={styles.description}> Light requirement: {databasePlant.careDetails === undefined ? null : databasePlant.careDetails.lightRequirements} </Text>
        <Text style={styles.description}> Last watered: {singlePlant.lastWatered === null ? 'Plant has not been watered yet' : newLastWatered} </Text>
        <Text style={styles.description}> Next watering: {singlePlant.nextWatering === null ? 'Please water your plant first' : newNextWatering} </Text>
        <Text>Turn on notifications for {singlePlant.nickName}: </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />

        <Button
        icon={{ name: "arrow-right", size: 15, color: "white" }}
        title="Watered"
        onPress={handleLastWatered}
        />
        <Button
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Delete Plant"
          onPress={() => handleRemovePlant()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    alignItems: "center"
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
    marginTop: 2,
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
  },
  description: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 20,
    lineHeight: 20,
    alignItems: "flex-start"
  },
});

export default SingleUserPlant;
