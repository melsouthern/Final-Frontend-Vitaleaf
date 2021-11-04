import React from 'react';
import { getPlants } from './utils/Api';
import { View, Text, TouchableOpacity,StyleSheet, Image} from "react-native";
import { Searchbar } from 'react-native-paper';

function SearchScreen(props:any) {
  const { navigation } = props
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query:string) => setSearchQuery(query);
  
  
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Search Data</Text>
        <Text>Look up data from categories screen</Text>
        <Searchbar style={styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

    <View style={styles.categoryPictureContainer}>
<TouchableOpacity style={styles.buttonContainer} onPress={getPlants}>  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={getPlants}>  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>

        
<TouchableOpacity style={styles.buttonContainer} onPress={getPlants}>  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={getPlants}>  
        <Image style={styles.categoryImage} source={require('../assets/cat1.jpg')} />
        </TouchableOpacity>



        </View>

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