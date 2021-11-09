import React, {useState, useEffect, useRef} from 'react';
import * as Permissions from "expo-permissions"
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {Camera} from 'expo-camera'
import axios, { Axios } from 'axios';


import { NavigationContainer } from '@react-navigation/native';
import * as AWS from 'aws-sdk'

import S3 from 'aws-sdk/clients/s3';
// var AWS = require('aws-sdk/dist/aws-sdk-react-native')

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
  // camera
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    paddingBottom: 20
  },
  cameraButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  
})
type cameraScreenProps = {navigation: any}
function CameraScreen({navigation}: cameraScreenProps) {
  
    const [cameraRollImage, setCameraRollImage] = useState({localUri:"", base64:""})
    const [cameraPhoto, setCameraPhoto] = useState({height:"", uri:"", width:"", base64:""}) 
    const [haveCameraPermission, setHaveCameraPermission] = useState("")
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [showCamera, setShowCamera] = useState(false) // not using
   const [identifiedPlant1, setIdentifiedPlant1] = useState({
    percentage: "",
    botanicalName: "",
  commonName:"",
image_url:""})
const [identifiedPlant2, setIdentifiedPlant2] = useState({
  percentage: "",
  botanicalName: "",
commonName:"",
image_url:""})
    


    const cameraRef = useRef(null)   
  
  function saveNotifier() {
     alert("Saved!")
  }  

  


  let openCameraAsync = async () => {
    //  let cameraPermissionResult = await Permissions.askAsync(Permissions.CAMERA)
      let cameraPermissionResult = await Camera.requestCameraPermissionsAsync()
  // console.log(cameraPermissionResult, ">>>>>>>>>>>>>>>>")
    if (cameraPermissionResult.granted === false) {
        alert ('Permission to use camera is required!')
        return
      }
  
      setHaveCameraPermission("Yes")  
      
      // console.log(">>>>>>>>>Hello!")

    }
    // console.log(">>>>>>>>>Hello....2  !")

    
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      // console.log(permissionResult, " IMAGE PICK RESULT")
      
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return
      }
      
      let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true})
      if (pickerResult.cancelled === true) {
        return
      }
      setCameraRollImage({localUri: pickerResult.uri, base64: pickerResult.base64}) 
      
    }
    
    async function saveCameraRollFunction() {
      const apiResponse = await axios.patch
      ("https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/hello/plants/hello-1636374684637/image",
       {img: cameraRollImage.base64} )
      
      if (apiResponse.status === 200) saveNotifier()
    }
    
    
    if (cameraRollImage.localUri !== ""){
      
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: cameraRollImage.localUri }}
            style={styles.thumbnail}
            />
        <TouchableOpacity
          onPress={() => saveCameraRollFunction()}
          style={styles.button}
          >

        <Text style={styles.buttonText}>Save chosen image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Break

  async function makeApiCall () {
    let plant:any;
    try {
      const response = await axios.post(
        "https://api.plant.id/v2/identify",
        {
          api_key: "iV7mwOKohIvJItMVxVm9EaZOuivehgHxZPYoEbYUEyWkKYtOAF",
          images: [cameraPhoto.base64],
          plant_language: "en",
          plant_details: ["common_names"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const suggestedPlants = response.data.suggestions.map((plant) => {
        return {
          botanicalName: plant.plant_name,
          // commonName: plant.plant_details.common_names,
          probability: plant.probability,
        }
      })
      
      
      const apiResponse = await axios.post("https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/plants", 
      {plantsFromPlantId: suggestedPlants}
      )
     
      setIdentifiedPlant1({
        percentage: apiResponse.data[0].probability,
        botanicalName: apiResponse.data[0].botanicalName,
      commonName:apiResponse.data[0].commonName,
    image_url:apiResponse.data[0].image_url
  })
      
      
    } catch (err) {
      console.log(err);
    }
  }
  function resetStates() {
    setCameraPhoto({height:"", uri:"", width:"", base64:""})
          setIdentifiedPlant1({
            percentage: "",
            botanicalName: "",
          commonName:"",
        image_url:""})
        setHaveCameraPermission("")
  }
  if(identifiedPlant1.percentage !== ""){
 
 return(
    <View style={styles.container}>
      <Text> Your plants common name is {identifiedPlant1.commonName}, latin name {identifiedPlant1.botanicalName} with a {identifiedPlant1.percentage} probability</Text>
        <Image
        
          source={{uri: identifiedPlant1.image_url }}
          style={styles.thumbnail}
          />
      
      <TouchableOpacity
        onPress={ ()=> navigation.navigate('Main', {screen: 'Home'})
        }
        
        style={styles.button}
        >

      <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
 )
  }

  async function saveCameraPhotoFunction() {
    // console.log(cameraPhoto)
    const apiResponse = await axios.patch
    ("https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/hello/plants/hello-1636374684637/image",
     { img: cameraPhoto.base64 })
    if (apiResponse.status === 200) saveNotifier()

  }


  if (cameraPhoto.height !== ""){
    return (
      <View style={styles.container}>
        <Image
        
          source={{ uri: cameraPhoto.uri }}
          style={styles.thumbnail}
          />
      <TouchableOpacity
        onPress={() => {saveCameraPhotoFunction()}}
        
        style={styles.button}
        >

      <Text style={styles.buttonText}>Save chosen image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ ()=> {makeApiCall()}


        }
          
        
        style={styles.button}
        >

      <Text style={styles.buttonText}>Identify this plant</Text>
      </TouchableOpacity>
    </View>
  ); }


  const takePhoto = async () => {
 if (cameraRef) {    // Was - if(cameraRef)
   console.log("In take photo")
  //  console.log(cameraRef)
   try{
     let photo = await cameraRef.current.takePictureAsync({
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
       base64: true,

     })
    //  console.log(photo)
     setCameraPhoto(photo)
    //  console.log(cameraPhoto)
     return photo
   } catch (error) {
     console.log(error)
   }
 }

  }
  if (haveCameraPermission === "Yes") {
    // console.log("Are we in the render of camera?")
     return (
         <View style={styles.cameraContainer}>
          
           <Camera style={styles.camera} type={type} ref={cameraRef}>
             <View style={styles.buttonContainer}>
               <TouchableOpacity
                 style={styles.cameraButton}
                 onPress={() => {
                     setType(
                         type === Camera.Constants.Type.back
                           ? Camera.Constants.Type.front
                           : Camera.Constants.Type.back
                       );
                     }}>
                     <Text style={styles.text}> Flip </Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.cameraButton}
                   onPress={async () => {
                     const r = await takePhoto()
                    
                  }}
                   >

                   <Text style={styles.text}> Photo </Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.cameraButton}
                  //  onPress={}
                   >

                   <Text style={styles.text}> Cancel </Text>
                   </TouchableOpacity>
                 </View>
               </Camera> 
               
             </View>
           );

  }
  
  return (
    
    <View style={styles.container}>

      <Text >Add a plant to your collection!</Text>
      
      <Text>Push button to select from camera roll </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <Text> Push button to open camera</Text>
      <TouchableOpacity onPress={openCameraAsync} style={styles.button}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  )
 
}


export default CameraScreen

// >>>>> Break >>>>>

