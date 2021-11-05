import React from "react";
import { View, Text, ScrollView, StyleSheet, List, SafeAreaView,TouchableOpacity, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { getPlants } from "./utils/Api";
import { ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

const SingleCategoryPlantScreen = (props: any) => {
  const {navigation} = props
  const [plants, setPlants] = useState([]);
  const {plantCategoryId} = props.route.params
  const [selectedId, setSelectedId] = useState(null);



  useEffect(() => {
    getPlants(plantCategoryId)
      .then((response) => {
        setPlants(response);
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  },[]);

  const handleOnPress = (commonName:string) => {
        navigation.navigate("Single Looked Up Plant", commonName);
};

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.commonName}</Text>
      <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
      <Avatar source={{uri: item.image_url}} />

    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#d6d6d6";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => handleOnPress(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
    
  };
  console.log(selectedId)
  return (
    
      <SafeAreaView style={styles.container}>
      <FlatList contentContainerStyle={styles.subtitleView}
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.botanicalName}
        extraData={selectedId}
      />
    </SafeAreaView>
      
    
  );
};

const styles = StyleSheet.create({
  subtitleView: {
    
    flexDirection: "column", paddingLeft: 10, paddingTop: 5 },
  ratingImage: { height: 19.21, width: 100 },
  ratingText: { paddingLeft: 10, color: "grey" },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  title: {
    fontSize: 15,
    fontWeight:'bold',
  },
  subtitle: {
    fontSize: 10,
    
  },
});

export default SingleCategoryPlantScreen;

