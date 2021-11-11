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
import { ProgressBar, Colors, ActivityIndicator} from "react-native-paper";
import { ListItem, Avatar } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


type cameraScreenProps = {navigation: any, props: any}

function InventoryScreen({navigation}, props: any) {
  const { userName, setUserName } = useContext(UserContext);
  const [userPlants, setUserPlants] = useState([]);
  // const { navigation } = props;
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    getUserPlantsFromDatabase(userName)
      .then((response) => {
        setUserPlants(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  }, [isFocused]);

  const handleOnPress = (plant_id: string) => {
    console.log(plant_id, "<<<<inv");
    
    navigation.navigate("Single User Plant", plant_id);
  };

  const EmptyListMessage = ({ item }) => {
    return (
      <View style={{justifyContent: "center"}}>
        <Image
          source={require('../assets/plant.png')}
          style={{marginLeft: "15%", marginTop: "30%"}}
        />
        <View style={{flex:0.5, flexDirection: 'row', justifyContent: "center"}}>

        <TouchableOpacity onPress={() => {navigation.navigate("Search");}}
       style={styles.button}>
        <Text style={styles.buttonText}>Click to search up a new plant!</Text>
        <MaterialCommunityIcons style={styles.buttonText} name="arrow-right" size={26} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigation.navigate("Camera");}}
       style={styles.button}>
        <Text style={styles.buttonText}>Click here to photograph plants!</Text>
        <MaterialCommunityIcons style={styles.buttonText} name="arrow-right" size={26} />
      </TouchableOpacity>
         </View>

      </View>
    );
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <ImageBackground
        imageStyle={{ opacity: 0.4 }}
        style={styles.imagebackground}
        source={{ uri: item.image }}
      > 
      <View style={styles.textContainer}>
        <Text style={[styles.title, textColor]}>{item.nickName}</Text>
        <Text style={[styles.subtitle, textColor]}>{item.commonName}</Text>
        <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
      </View>
        
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#004346";
    const color = item.id === selectedId ? "black" : "white";

    return (
      <View>
        <Item
          item={item}
          onPress={() => handleOnPress(item)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </View>
    );
  };

  if (loading)
  return (
    <View style={styles.loading}>
          <Text style={styles.loadingText}>loading...</Text>
          <ActivityIndicator size='large' animating={true} color={Colors.green800} />
        </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.userPlantView}
        numColumns={1}
        horizontal={false}
        data={userPlants}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        extraData={selectedId}
        initialNumToRender={5}
        maxToRenderPerBatch={1}
        windowSize={21}
        ListEmptyComponent={EmptyListMessage}
      />
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
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#EFF5E7",
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
  	height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
    flex: 2,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#004346",
    height: 200,
  },
  textContainer: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 15,
  },
  titletext: {
    fontSize: 25,
  },
  imagebackground: {
    flex: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 0,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 35,
    fontWeight: "500",
  },
  loading: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#09BC8A',
    textAlign: "center"
  },
  button: {
    
    backgroundColor: '#004346',
    padding: 20,
    borderRadius: 5,
    width: "50%",
    marginTop: 10,
    marginLeft: 2,
    marginRight:2,
    
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
  },
});

export default InventoryScreen;
