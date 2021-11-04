import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useState, useRef, useContext, useEffect } from "react";
import { PlantCategoryContext, PlantCategoryProvider } from "./utils/Context";
import { getPlants } from "./utils/Api";
import { ListItem, Avatar } from "react-native-elements";

const SingleCategoryPlantScreen = (props: any) => {
  const { plantCategory, setPlantCategory } = useContext(PlantCategoryContext);
  const [plants, setPlants] = useState([]);
  // interface IMyPlantCategoryProps {
  //   plantCategory: string;
  //   setPlantCategory: (newPlantCategory: string) => void;
  // }

  //const {route} = props
  //const {plantCategory, setPlantCategory} = props;
  //console.log(plantCategory,'<----props?')

  useEffect(() => {
    getPlants(plantCategory)
      .then((response) => {
        setPlants(response);
        //console.log(response)
      })
      .catch((err) => {
        console.log(err, "<-----err");
      }, []);
  });

  return (
    <PlantCategoryProvider>
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
      
    </PlantCategoryProvider>
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
