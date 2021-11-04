import React from 'react';
import { useState, useRef } from 'react';
import { getPlants } from './utils/Api';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions, StyleSheet
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';



function SearchScreen(props:any) {
  const { navigation } = props
  const [searchQuery, setSearchQuery] = React.useState('');
  const [plantCategory, setPlantCategory] = React.useState('')
  const onChangeSearch = (query:string) => setSearchQuery(query);
  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  // const handleOnPress = () => {
  //   setPlantCategory
  // }
  
  const { width } = Dimensions.get('window');
  const SPACING = 10;
  const THUMB_SIZE = 80;
  
  const IMAGES = {
    image1: require('../assets/cat1.jpg'),
    image2: require('../assets/cat1.jpg'),
    image3: require('../assets/cat1.jpg'),
    image4: require('../assets/cat1.jpg'),
    image5: require('../assets/cat1.jpg'),
    image6: require('../assets/cat1.jpg'),
    image7: require('../assets/cat1.jpg')
  };


  const [images, setImages] = useState([
    { id: '1', image: IMAGES.image1 },
    { id: '2', image: IMAGES.image2 },
    { id: '3', image: IMAGES.image3 },
    { id: '4', image: IMAGES.image4 },
    { id: '5', image: IMAGES.image5 },
    { id: '6', image: IMAGES.image6 },
    { id: '7', image: IMAGES.image7 }
  ]);

  
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Search Data</Text>
        <Text>Look up data from categories screen</Text>
        <Searchbar style={styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

<View style={{ flex: 1, alignItems: 'center' }}>
    {/* Title JSX Remains same */}
    {/* Carousel View */}
    <View style={{ flex: 1 / 2, marginTop: 20 }}>
      <Carousel
        layout='default'
        data={images}
        sliderWidth={width}
        itemWidth={width}
        
        renderItem={({ item, index }) => (
          <Image
            key={index}
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            source={item.image}
          />
        )}
        onSnapToItem={index => onSelect(index)}
      />
      <View
  style={{
    marginTop: 20,
    paddingHorizontal: 32,
    alignSelf: 'flex-end'
  }}
>
  <Text
    style={{
      color: 'black',
      fontSize: 22
    }}
  >
    {indexSelected + 1}/{images.length}
  </Text>
</View>
      <Pagination
    inactiveDotColor='gray'
    dotColor={'orange'}
    activeDotIndex={indexSelected}
    dotsLength={images.length}
    animatedDuration={150}
    inactiveDotScale={1}
  />
    </View>
  </View>

    {/* <View style={styles.categoryPictureContainer}>
        <TouchableOpacity  style={styles.buttonContainer} onPress={handleOnPress}>  
        <Image style={styles.categoryImage} name={'cat1'}source={require('../assets/cat1.jpg')}
           />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Single Plant Category')} >  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>

        
<TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Single Plant Category')} >  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Single Plant Category')}>  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>



        </View> */}

        {/* <TouchableOpacity style={styles.buttonContainer} onPress={getPlants}>  
        <Text style={styles.buttonText}>All The Plants</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Single Plant Category')}>
        <Text style={styles.buttonText}>Single Plant Category</Text>
      </TouchableOpacity>

        
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Single Looked Up Plant')}>
        <Text style={styles.buttonText}>Single Plant</Text>
      </TouchableOpacity> */}

     
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#ebebeb'
    },
    text: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold'
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20
    },
    buttonText: {
      fontSize: 20,
      color: '#fff'
    },
    searchbar: {
      width: 300,
    },
    categoryImage: {
      width: 100,
      height: 100,
      
    },
    categoryPictureContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  })

  export default SearchScreen