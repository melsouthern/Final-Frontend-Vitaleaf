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
  const [plantSearch, setPlantSearch] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [indexSelected, setIndexSelected] = useState(0);

  const handleSearch = (event: object) => {
    navigation.navigate("Searched For Plants", { searchQuery });
  };

  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };
  const { width } = Dimensions.get("window");
  const window = width * 0.88;
  const sliderWindow = width * 1;

  const SPACING = 10;
  const THUMB_SIZE = 80;

  const IMAGES = {
    image1: require("../assets/flowering-house-plants-7.jpeg"),
    image2: require("../assets/foilage-house-plants-2.jpeg"),
    image3: require("../assets/cacti-and-succs-house-plants.jpeg"),
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
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search plant..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={(searchQuery) => handleSearch(searchQuery)}
      />
      <View style={styles.carouselContainer}>
        <Carousel
          style={styles.carousel}
          layout="default"
          data={images}
          sliderWidth={window}
          itemWidth={window}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => handleOnPress(item.id)}
            >
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
  carouselContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  //carouselContainer has buttons - don't delete

  carousel: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF5E7",
  },
  header: {
    paddingTop: 15,
    fontSize: 20,
    color: "#EFF5E7",
    // paddingBottom: 5,
    // minHeight: 50,
    // height: 60,
    //#09BC8A
  },
  searchbar: {
    width: 300,
    marginTop: 40,
  },
  touchable: {
    width: "100%",
    // height: 250,
    aspectRatio: 1 * 1.5,
    overflow: "hidden",
    marginTop: "20%",
    alignItems: "center",
    alignContent: "center",
    // marginHorizontal: "5%",
    borderRadius: 10,
    backgroundColor: "#004346",
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
    // flex: 1,
    width: "100%",
    maxHeight: "100%",
    resizeMode: "stretch",
    // height: 600,
    // alignContent: "center",
  },
});

export default SearchScreen;
