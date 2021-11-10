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

function InventoryScreen(props: any) {
  const { userName, setUserName } = useContext(UserContext);
  const [userPlants, setUserPlants] = useState([]);
  const { navigation } = props;
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
    navigation.navigate("Single User Plant", plant_id);
  };

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text onPress={() => getItem(item)}>No Plants Yet......</Text>
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
        {/* <Text style={styles.title}>Plants</Text> */}
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
    <View>
      <Text style={{flex: 1, fontSize: 30, justifyContent:'center'}}>loading...</Text>
      <ProgressBar />
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
    // padding: 10,
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
    // width: "100%",
    // height: "100%",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 0,
    // resizeMode: "center",
    borderRadius: 10,
  },
});

export default InventoryScreen;
