import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  List,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from "react-native";
import { useState, useEffect } from "react";
import { getPlants } from "./utils/Api";
import { ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { ProgressBar, Colors } from "react-native-paper";

const SingleCategoryPlantScreen = (props: any) => {
  const { navigation } = props;
  const [plants, setPlants] = useState([]);
  const { plantCategoryId } = props.route.params;
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlants(plantCategoryId)
      .then((response) => {
        setPlants(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  }, []);

  const handleOnPress = (commonName: string) => {
    navigation.navigate("Single Looked Up Plant", commonName);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
       <ImageBackground imageStyle={{opacity: 0.4}} source={{ uri: item.image_url }} style={styles.imagebackground}>
      <Text style={[styles.title, textColor]}>{item.commonName}</Text>
      <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
      {/* <Avatar source={{ uri: item.image_url }} /> */}
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#082d0fff";
    const color = item.id === selectedId ? "white" : "#dee5e5ff";

    if (loading)
      return (
        <View>
          <Text>loading...</Text>
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
  console.log(selectedId);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.subtitleView}
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.botanicalName}
        extraData={selectedId}
        initialNumToRender={5}
        maxToRenderPerBatch={1}
        windowSize={21}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "column",
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
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    
    fontSize: 25,
    fontWeight:"900"
  },
  subtitle: {
    fontSize: 15,
  },
  imagebackground: {
    width: '100%', 
    height: '100%', 
    borderStyle: 'solid', 
    borderColor: 'grey', 
    borderWidth: 1,
  }
});

export default SingleCategoryPlantScreen;
