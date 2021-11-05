import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getPlants } from "./utils/Api";
import { ListItem, Avatar } from "react-native-elements";

const SingleCategoryPlantScreen = (props: any) => {
  const [plants, setPlants] = useState([]);
  const {plantCategoryId} = props.route.params

  useEffect(() => {
    getPlants(plantCategoryId)
      .then((response) => {
        setPlants(response);
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  },[]);

  return (
    
      <View style={styles.subtitleView}>
      <ScrollView style={styles.scrollView}>
        {plants.map((plant, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: plant.image_url }} />
            <ListItem.Content>
              <ListItem.Title>{plant.botanicalName}</ListItem.Title>
              <ListItem.Subtitle>{plant.commonName}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
        </ScrollView>
      </View>
      
    
  );
};

const styles = StyleSheet.create({
  subtitleView: {
    
    flexDirection: "column", paddingLeft: 10, paddingTop: 5 },
  ratingImage: { height: 19.21, width: 100 },
  ratingText: { paddingLeft: 10, color: "grey" },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default SingleCategoryPlantScreen;
