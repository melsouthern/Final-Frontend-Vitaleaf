import React, { FC } from "react";
import { useState, useRef, useContext } from "react";
import { getPlants } from "./utils/Api";
import {
TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Searchbar as Searchbox, Searchbar } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";

const SearchScreen = (props: any) => {
  const { navigation } = props;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [plantSearch, setPlantSearch] = React.useState('')
  
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [indexSelected, setIndexSelected] = useState(0);

  const handleSearch = (event: object) => {
        navigation.navigate("Searched For Plants", {searchQuery});
  }

  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };
  const { width } = Dimensions.get("window");
  // const SPACING = 10;
  // const THUMB_SIZE = 80;

  const IMAGES = {
    image1: require("../assets/Indoor-Flowers.jpg"),
    image2: require("../assets/foliage-house-plants-1.jpg"),
    image3: require("../assets/cacti_2.jpg"),
  };

  const [images, setImages] = useState([
    { id: "Flowering House Plants", image: IMAGES.image1 },
    { id: "Foliage House Plants", image: IMAGES.image2 },
    { id: "Cacti and Other Succulents", image: IMAGES.image3 },
  ]);

  const handleOnPress = (plantCategoryId: string) => {
        navigation.navigate("Single Plant Category", { plantCategoryId });
  };

  return (
    <View
      style={styles.container}
    >
      <Searchbar
        style={styles.searchbar}
        placeholder="Search plant..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={(searchQuery) => handleSearch(searchQuery)}
        
      />
        <View style={styles.carousel}>
          <Carousel
          
            layout="default"
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.touchable} onPress={() => handleOnPress(item.id)}>
                <Text style={styles.header}>{item.id}</Text>
                <Image
                  key={index}
                  style={styles.categoryImage}
                  resizeMode="contain"
                  source={item.image}
                />
              </TouchableOpacity>
            )}
            onSnapToItem={(index) => onSelect(index)}
          />
          <Pagination
            inactiveDotColor="gray"
            dotColor={"orange"}
            activeDotIndex={indexSelected}
            dotsLength={images.length}
            animatedDuration={150}
            inactiveDotScale={1}
          />
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EFF5E7",
  },
  carousel: {
    flex:1,
    alignItems: "center",
    justifyContent:"center",
  },
  header: {
    fontSize: 25,
    color: "#EFF5E7"
    //#09BC8A
  },
  searchbar: {
    width: 300,
    marginTop: 10,
  },
  touchable: {
    marginTop: "30%", 
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#004346",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
  },
  categoryImage: {
    width: "100%", 
    height: "100%", 
    alignContent: "center",
    borderRadius: 0
  }
});

export default SearchScreen;
