import React from 'react';
import { useState, useRef } from 'react';
import { getPlants } from './utils/Api';
import { TouchableOpacity, View, Text, Image, FlatList, Dimensions, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';



function SearchScreen(props:any) {
  const { navigation } = props
  const [searchQuery, setSearchQuery] = React.useState('');
  const [plantCategory, setPlantCategory] = React.useState('')
  const onChangeSearch = (query:string) => setSearchQuery(query);
  const [indexSelected, setIndexSelected] = useState(0);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const onSelect = (indexSelected:number) => {
    setIndexSelected(indexSelected);
  };

  const handleOnPress = (item: { id: string; image?: any; }) => {
    console.log(item.id)
    setPlantCategory(item.id)
    navigation.navigate('Single Plant Category')
  }
  
  const { width } = Dimensions.get('window');
  const SPACING = 10;
  const THUMB_SIZE = 80;
  
  const IMAGES = {
    image1: require('../assets/flowering-house-plants-1.jpg'),
    image2: require('../assets/foliage-house-plants-1.jpg'),
    image3: require('../assets/cacti-1.jpg'),
    
  };


  const [images, setImages] = useState([
    { id: 'Foliage House Plants', image: IMAGES.image1 },
    { id: 'Flowering House Plants', image: IMAGES.image2 },
    { id: 'Cacti and Other Succulents', image: IMAGES.image3 },
    
  ]);

  
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Search Data</Text>
        
        <Searchbar style={styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

<View style={{ flex: 1, alignItems: 'center' }}>
    {/* Title JSX Remains same */}
    {/* Carousel View */}
    <View style={{ flex: 1, marginTop: 20 }}>
      <Carousel
        layout='default'
        data={images}
        sliderWidth={width}
        itemWidth={width}
        
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={(event) => handleOnPress(item)}>  
           <Text style={{fontFamily:'inter', fontSize:30}} >{item.id}</Text>
          <Image
            key={index}
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            source={item.image}
            
          />
         
          </TouchableOpacity>
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
    {/* {indexSelected + 1}/{images.length} */}
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