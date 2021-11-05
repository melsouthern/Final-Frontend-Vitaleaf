import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useState, useEffect } from "react"
import { getSinglePlant } from './utils/Api';
import { Image } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const SingleLookedUpPlantScreen = (props:any) => {
  const {route} = props
  const [singlePlant, setSinglePlant] = useState({});
  const {commonName} = props.route.params
  
  const imageSource = singlePlant.image_url
  

  useEffect(() => {
    getSinglePlant(commonName)
      .then((response) => {
       setSinglePlant(response);
        
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  },[]);

    return (
      <ScrollView>
        <View style={ styles.container}>
        <Image  source={ {uri:imageSource} }  style={{ width: 250, height: 250, borderRadius:100 }}  PlaceholderContent={<ActivityIndicator />}/>
        <Text style={styles.title}> {singlePlant.commonName} </Text>
        <Text style={styles.subtitle}> {singlePlant.botanicalName} </Text>
        <Text style={styles.description}> {singlePlant.description} </Text>
        <Button icon={{ name: "arrow-right", size: 15, color: "white" }}  title="Add To Inventory"/>
      </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    
  },
  header: {
    flex: 1,
    
  },
  section: {
    flex: 3,
    
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle:'italic'
  },
  description: {
    fontSize: 15,
    fontWeight: '300',
    marginHorizontal:20,
    lineHeight: 20,
    
  }
})

export default SingleLookedUpPlantScreen