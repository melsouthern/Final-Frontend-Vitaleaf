

const onSelect = (indexSelected:number) => {
    setIndexSelected(indexSelected);
  };

  const handleOnPress = () => {
    setPlantCategory
  }
  
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
          <TouchableOpacity onPress={handleOnPress}>  
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