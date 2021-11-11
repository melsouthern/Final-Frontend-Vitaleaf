import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { getSingleUserPlantFromDatabase, deleteSinglePlantFromDatabase, getSinglePlant, patchUserPlantWatering } from "./utils/Api";
import { getPlants } from "./utils/Api";
import { Image, Button } from "react-native-elements";
import { ActivityIndicator, Colors, Switch } from "react-native-paper";
import { UserContext, UserProvider } from "./utils/User";
import { DateTime } from "luxon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { objectLessAttributes } from "@aws-amplify/core";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    Alert.alert("Water Plant", `Have you watered ${singlePlant.nickName}?`, [
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
          style={{ width: 250, height: 250, borderRadius: 70, borderWidth: 2, borderColor: "#004346", marginTop: 10, marginBottom: 10,}}
          PlaceholderContent={<ActivityIndicator />}
        />
        </View>
        <Text style={styles.plantDesc}>Plant's nickname:</Text>
        <Text style={styles.title}> {singlePlant.nickName} </Text>
        <Text style={styles.plantDesc}>Plant's common name:</Text>
        <Text style={styles.subtitle} onPress={() => navigation.navigate("Single Looked Up Plant", singlePlant)}> {singlePlant.commonName} </Text>
        <View style={styles.careBoxWrapper}>
        <View style={styles.careContainer}>
        <MaterialCommunityIcons style={styles.icon} name={databasePlant.careDetails === undefined ? null : databasePlant.careDetails.lightRequirements === "Low light or partial shade" ? "weather-partly-cloudy" : "white-balance-sunny"} size={40} />
        <Text style={styles.careText}>{databasePlant.careDetails === undefined ? null : databasePlant.careDetails.lightRequirements} </Text>
        </View>
        <View style={styles.careContainer}>
        <MaterialCommunityIcons style={styles.icon} name="water-outline" size={40} />
        <Text style={styles.careText}>{databasePlant.category === "Cacti and Other Succulents" ? "Water every 3 - 4 weeks" : "Water every 1 - 2 weeks"} </Text>
        </View>
        </View>
        <View >
        <Text style={styles.calendarIcon}>
        {/* <MaterialCommunityIcons  name="calendar-heart" size={40} /> */}
        </Text>
        <Text style={{color: "#004346", fontWeight: "500", margin: 4}}>Last watered: {singlePlant.lastWatered === null ? 'Plant has not been watered yet' : newLastWatered} </Text>
        <Text style={{color: "#004346", fontWeight: "500", margin: 4}}>Next watering: {singlePlant.nextWatering === null ? 'Please water your plant first' : newNextWatering} </Text>
        </View>
        <TouchableOpacity onPress={handleLastWatered} style={styles.button}>
        <Text style={styles.buttonText}>Watered <MaterialCommunityIcons name="check-circle-outline" size={20} /></Text>
        
      </TouchableOpacity>
        {/* <Button
        style={{padding: 10}}
        icon={{ name: "arrow-right", size: 15, color: "white" }}
        title="Watered"
        onPress={handleLastWatered}
        /> */}
        <View style={styles.notification}>
        <Text style={{marginTop: 10, marginLeft: "25%", color: "white"}}>Turn on notifications for {singlePlant.nickName}: </Text>
        <Switch style={{marginLeft: "45%", marginBottom: 5, marginTop: 5}} value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <TouchableOpacity onPress={() => handleRemovePlant()} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete Plant <MaterialCommunityIcons name="close-circle-outline" size={20} /></Text>
        
      </TouchableOpacity>
        {/* <Button
        style={{padding: 10, marginLeft: 30}}
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Delete Plant"
          onPress={() => handleRemovePlant()}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF5E7",
    flex: 1,
    alignItems: "center",
  },
  plantDesc: {
    marginTop: 5,
    fontSize: 15,
    color: "grey",
    fontStyle: "italic",
  },
  textContainer: {
    width: 340,
    color: "#004346",
  },
  notification: {
    width: "100%",
    backgroundColor: "#004346",
    alignContent:"center",
    marginTop: 10,
    marginBottom: 10,
  },
  subContainer: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
    alignItems: "center"
  },
  header: {
    flex: 1,
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
    textDecorationLine: "underline",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#004346",
  },
  description: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "300",
    marginHorizontal: 20,
    lineHeight: 20,
    alignItems: "flex-start"
  },
  careBoxWrapper: {
    flexDirection:'row',
    width: "90%"
    // justifyContent: "space-between"
  },
  careContainer: {
    backgroundColor: "#508991",
    margin: 10,
    width: "35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.18,
    shadowRadius: 11.95,  
    elevation: 18,
  },
  icon: {
    paddingTop: 5,
    color: "#EFF5E7",

  },
  careText: {
    textAlign: "center",
    padding: 5,
    color: "#EFF5E7",

  },
  calendarIcon: {
    color: "#004346",
    textAlign: "center"
  },
  button: {
    backgroundColor: '#004346',
    padding: 20,
    borderRadius: 5,
    width: "50%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
  },
  deleteButton: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 5,
    width: "50%",
    marginTop: 20,
    // shadowColor: "#000",
    // shadowOffset: {
	  //   width: 0,
	  //   height: 9,
    //   },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,  
    // elevation: 18,
  },
  buttonText: {
    fontSize: 20,
    color: "#EFF5E7",

    textAlign: "center"
  },
});

export default SingleUserPlant;
