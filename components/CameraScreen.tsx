import React, {useState, useEffect, useContext, useRef} from 'react';


import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {Camera} from 'expo-camera'
import axios, { Axios } from 'axios';
import { getUserPlantsFromDatabase } from "./utils/Api";
import { UserContext} from "./utils/User";
import { NavigationContainer } from '@react-navigation/native';
import * as AWS from 'aws-sdk'
import SelectDropdown from 'react-native-select-dropdown'
import S3 from 'aws-sdk/clients/s3';
import takePicture from '../assets/take-picture-of-plant.png'
// var AWS = require('aws-sdk/dist/aws-sdk-react-native')

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#004346',
    padding: 20,
    borderRadius: 5,
    
  },
  buttonText: {
    fontSize: 20,
    color: '#09BC8A',
  },
  button2: {
    backgroundColor: '#004346',
    padding: 5,
    borderRadius: 5,
    
  },
  buttonText2: {
    fontSize: 19.5,
    color: '#09BC8A',
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
type cameraScreenProps = {navigation: any, props: any}
function CameraScreen({navigation}: cameraScreenProps) {
   const [selectedPlantIndex, setSelectedPlantIndex] = useState(0)
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
const { userName, setUserName } = useContext(UserContext);
const [userPlants, setUserPlants] = useState([]);
    
    useEffect(()=> {
      getUserPlantsFromDatabase(userName)
      .then((response) => {
        setUserPlants(response.filter(plant =>{
          return plant.plant_id
        }))
        
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
  }, []);
    

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
      
    
    }
        
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
      (`https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/${userName}/plants/${userPlants[selectedPlantIndex].plant_id}/image`,
       {img: cameraRollImage.base64} )
      
      if (apiResponse.status === 200) saveNotifier()
    }
    
    const userPlantsNames = userPlants.map(plant => { 
      return plant.nickName
    })
    //camera roll save
    if (cameraRollImage.localUri !== ""){
      
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: cameraRollImage.localUri }}
            style={styles.thumbnail}
            />


             <SelectDropdown
             buttonStyle={styles.button2}
             buttonTextStyle={styles.buttonText2}
	data={userPlantsNames}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
    setSelectedPlantIndex(index)
	}}
	// buttonTextAfterSelection={(selectedItem, index) => {
	// 	// text represented after item is selected
	// 	// if data array is an array of objects then return selectedItem.property to render after item is selected
	// 	return selectedItem.nickName
	// }}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
  
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
    (`https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/${userName}/plants/${userPlants[selectedPlantIndex].plant_id}/image`,
     { img: cameraPhoto.base64 })
    if (apiResponse.status === 200) saveNotifier()

  }

  // console.log(userPlants)
  // console.log(userPlantsNames)

  // after got photo, identify or save
  if (cameraPhoto.height !== ""){
    return (
      <View style={styles.container}>
        <Image
        
          source={{ uri: cameraPhoto.uri }}
          style={styles.thumbnail}
          />


      <SelectDropdown
      buttonStyle={styles.button2}
      buttonTextStyle={styles.buttonText2}
	data={userPlantsNames}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
    setSelectedPlantIndex(index)
	}}
	// buttonTextAfterSelection={(selectedItem, index) => {
	// 	// text represented after item is selected
	// 	// if data array is an array of objects then return selectedItem.property to render after item is selected
	// 	return selectedItem.nickName
	// }}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>    
      <TouchableOpacity
        onPress={() => {saveCameraPhotoFunction()}}
        
        style={styles.button}
        >

      <Text style={styles.buttonText}>Save chosen image to selected plant</Text>
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

 //taking photo function
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
     setCameraPhoto(photo)
     return photo
   } catch (error) {
     console.log(error)
   }
 }

  }
  //Inside camera - taking a picture
  if (haveCameraPermission === "Yes") {
    
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
  //1st screen displayed
  
   
  return (
    
    <View style={styles.container}>

      <Text >Add a plant to your collection!</Text>
      <Image source={takePicture} />
      <Text>Push button to select from camera roll to add plant to your inventory</Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <Text> Push button to open camera, then you can add a photo to your plant or identify a new plant</Text>
      <TouchableOpacity onPress={openCameraAsync} style={styles.button}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  )
 
}


export default CameraScreen

// >>>>> Break >>>>>

