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
      <Text style={[styles.title, textColor]}>{item.commonName}</Text>
      <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
      <Text style={[styles.title, textColor]}>{item.nickName}</Text>
      <Avatar source={{ uri: item.image }} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#dee5e5";
    const color = item.id === selectedId ? "black" : "black";

    if (loading)
      return (
        <View>
          <Text>loading profile...</Text>
          <ProgressBar />
        </View>
      );

    return (
      <Item
        item={item}
        onPress={() => handleOnPress(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titletext}>{userName}'s plants...</Text>

      <FlatList
        contentContainerStyle={styles.userPlantView}
        numColumns={2}
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
