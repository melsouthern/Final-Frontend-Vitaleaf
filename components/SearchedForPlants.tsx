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
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { getPlants } from "./utils/Api";
import { ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { ProgressBar, Colors } from "react-native-paper";

const SearchedForPlants = (props: any) => {
  const { navigation } = props;
  const [searchedPlants, setSearchedPlants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { plantCategory, searchQuery } = props.route.params;

  useEffect(() => {
    setLoading(true);
    getPlants(plantCategory, searchQuery)
      .then((response) => {
        setSearchedPlants(response);
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
      <ImageBackground
        imageStyle={{ opacity: 0.4 }}
        source={{ uri: item.image_url }}
        style={styles.imagebackground}
      >
        <Text style={[styles.title, textColor]}>{item.commonName}</Text>
        <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
        {/* <Avatar source={{ uri: item.image_url }} /> */}
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View>
        <Text style={styles.title}>loading...</Text>
        <ProgressBar progress={0.75} color={Colors.lightGreen800} />
      </View>
    );

  if (searchedPlants.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> No Results Found</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#082d0fff";
    const color = item.id === selectedId ? "white" : "#dee5e5ff";

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
      <FlatList
        contentContainerStyle={styles.subtitleView}
        data={searchedPlants}
        renderItem={renderItem}
        keyExtractor={(item) => item.botanicalName}
        extraData={selectedId}
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
    borderRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 15,
  },
  imagebackground: {
    width: "100%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
  },
});

export default SearchedForPlants;
