import React from 'react';
import {useState} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {Camera} from 'expo-camera'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#354D2A',
    padding: 20,
    borderRadius: 5,
    
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain', //useful line, makes the image not square if the selected image is not
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

})

function CameraScreen() {
 

  const [cameraRollImage, setCameraRollImage] = React.useState({localUri:""})
  const [cameraPhoto, setCameraPhoto] = React.useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === true) {
      return
    }
    setCameraRollImage({ localUri: pickerResult.uri })

  }
  
  if (cameraRollImage.localUri !== ""){
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: cameraRollImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          onPress={() => alert('Saved!')}
          style={styles.button}
        >

        <Text style={styles.buttonText}>Save chosen image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     
      <Text >Add a plant to your collection!</Text>
      {/* <Image source={} style={} /> */}
      <Text>Push button to select from camera roll </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <Text> Push button to open camera</Text>
      <TouchableOpacity onPress={() => alert('To add')} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  )
  
}


  export default CameraScreen