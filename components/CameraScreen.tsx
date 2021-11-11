import React, {useState, useEffect, useContext, useRef} from 'react';


import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {Camera} from 'expo-camera'
import axios, { Axios } from 'axios';
import { getSingleUserPlantFromDatabase, getUserPlantsFromDatabase } from "./utils/Api";
import { UserContext} from "./utils/User";
import { NavigationContainer } from '@react-navigation/native';
import * as AWS from 'aws-sdk'
import SelectDropdown from 'react-native-select-dropdown'
import S3 from 'aws-sdk/clients/s3';
import takePicture from '../assets/take-picture-of-plant.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, ProgressBar, Colors } from 'react-native-paper';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MaterialCommunityIcons } from "@expo/vector-icons";

// var AWS = require('aws-sdk/dist/aws-sdk-react-native')

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#004346',
    padding: 20,
    borderRadius: 5,
    width: "50%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
  },
  
  mainImg: {
    marginBottom: 20,
    // width: "80%",
    borderRadius: 15,
  },

  imagebackground: {
    width: "100%",
    height: "100%",
  },

  item: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
    flex: 2,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#004346",
    height: 100,
    width: "87%",
  },
  choosePhoto: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,  
    elevation: 18,
    flex: 2,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#004346",
    height: 100,
    width: "87%",
  },
  responseText: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
  },
  selectPhotoText: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 15,
  },
  subtitleProb: {
    fontSize: 25,
    marginTop: 25
  },
  subtitleView: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 5,
  },

  buttonText: {
    fontSize: 20,
    color: '#09BC8A',
    textAlign: "center"
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
    backgroundColor: "#EFF5E7",

    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#EFF5E7",
    flex: 1,
  },
  identifiedPlantContainer: {
    flex: 1,
    backgroundColor: "#EFF5E7",
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
    // margin: 20,
    paddingBottom: 20
  },
  cameraButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',

  },
  textContainer: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
  },
  loadingText: {
    fontSize: 35,
    fontWeight: "500",
  },
  loading: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#EFF5E7",
  }
})
type cameraScreenProps = {navigation: any, props: any}
function CameraScreen({navigation}: cameraScreenProps) {
   const [selectedPlantIndex, setSelectedPlantIndex] = useState(0)
    const [cameraRollImage, setCameraRollImage] = useState({localUri:"", base64:""})
    const [cameraPhoto, setCameraPhoto] = useState({height:"", uri:"", width:"", base64:""}) 
    const [haveCameraPermission, setHaveCameraPermission] = useState("")
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [showCamera, setShowCamera] = useState(false) // not using
   const [identifiedPlant1, setIdentifiedPlant1] = useState([])
const [identifiedPlant2, setIdentifiedPlant2] = useState({
  percentage: "",
  botanicalName: "",
commonName:"",
image_url:""})
const { userName, setUserName } = useContext(UserContext);
const [userPlants, setUserPlants] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [cameraOption, setCameraOption] = useState("");
const [loading, setLoading] = useState(false);
console.log(cameraOption);

    
    useEffect(()=> {
      // setIdentifiedPlant1([])
      // setCameraRollImage({localUri:"", base64:""})
      // setHaveCameraPermission("")
      // setCameraPhoto({height:"", uri:"", width:"", base64:""})
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
    
  useFocusEffect(
    React.useCallback(() => {
      setIdentifiedPlant1([])
      setHaveCameraPermission("")
      setCameraPhoto({height:"", uri:"", width:"", base64:""})
      setCameraRollImage({localUri:"", base64:""})
      getUserPlantsFromDatabase(userName)
      .then((response) => {
        setUserPlants(response.filter(plant =>{
          return plant.plant_id
        }))
        
      })
      .catch((err) => {
        console.log(err, "<-----err");
      });
    }, [])
  );

    const cameraRef = useRef(null)   
  
  function saveNotifier(plant_id) {
     alert(`Saved to ${plant_id.nickName}!`)
     navigation.navigate("Single User Plant", plant_id);
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
      if (cameraOption === "newPhoto") {
        setCameraRollImage({localUri: pickerResult.uri, base64: pickerResult.base64}) 
      } else if (cameraOption === "identify") {
        makeApiCall(pickerResult.base64)
      }
    }
    
    // async function saveCameraRollFunction() {
    //   const selectedPlantId = userPlants[selectedPlantIndex].plant_id;    
    //   const apiResponse = await axios.patch
    //   (`https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/${userName}/plants/${selectedPlantId}/image`,
    //    {img: cameraRollImage.base64} )
    //   console.log(apiResponse);
      
    //   if (apiResponse.status === 200) saveNotifier(userPlants[selectedPlantIndex])
    // }
    
    // const userPlantsNames = userPlants.map(plant => { 
    //   return plant.nickName
    // })
    //camera roll save
//     if (cameraRollImage.localUri !== ""){
      
//       return (
//         <View style={styles.container}>
//           <Image
//             source={{ uri: cameraRollImage.localUri }}
//             style={styles.thumbnail}
//             />


//              <SelectDropdown
//              buttonStyle={styles.button2}
//              buttonTextStyle={styles.buttonText2}
// 	data={userPlantsNames}
// 	onSelect={(selectedItem, index) => {
// 		console.log(selectedItem, index)
//     setSelectedPlantIndex(index)
// 	}}
// 	// buttonTextAfterSelection={(selectedItem, index) => {
// 	// 	// text represented after item is selected
// 	// 	// if data array is an array of objects then return selectedItem.property to render after item is selected
// 	// 	return selectedItem.nickName
// 	// }}
// 	rowTextForSelection={(item, index) => {
// 		// text represented for each item in dropdown
// 		// if data array is an array of objects then return item.property to represent item in dropdown
// 		return item
// 	}}
  
// />    
//         <TouchableOpacity
//           onPress={() => saveCameraRollFunction()}
//           style={styles.button}
//           >

//         <Text style={styles.buttonText}>Save chosen image</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

  // Break

  async function makeApiCall (base64Img) {
    // console.log(cameraPhoto);
    // console.log(base64Img, "<<????");
    
    let plant:any;
    try {
      const response = await axios.post(
        "https://api.plant.id/v2/identify",
        {
          api_key: "iV7mwOKohIvJItMVxVm9EaZOuivehgHxZPYoEbYUEyWkKYtOAF",
          images: [base64Img],
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
     console.log(apiResponse.data);
     
      setIdentifiedPlant1(apiResponse.data)
      
      
    } catch (err) {
      console.log(err);
    }
  }

  if (identifiedPlant1.length > 0) {
    const handleOnPress = (commonName: string) => {
      navigation.navigate("Single Looked Up Plant", commonName);
      setIdentifiedPlant1([])
      setCameraRollImage({localUri:"", base64:""})
    };

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <ImageBackground
          imageStyle={{ opacity: 0.4 }}
          source={{ uri: item.image_url }}
          style={styles.imagebackground}
        >
          <View style={styles.responseText}>
          <Text style={[styles.title, textColor]}>{item.commonName}</Text>
          <Text style={[styles.subtitle, textColor]}>{item.botanicalName}</Text>
          <Text style={[styles.subtitle, textColor]}>Probability: {item.probability}</Text>
          </View>
          {/* <Avatar source={{ uri: item.image_url }} /> */}
        </ImageBackground>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#082d0fff";
      const color = item.id === selectedId ? "white" : "#dee5e5ff";
  
      return (
        <Item
          item={item}
          onPress={() => handleOnPress(item)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
console.log(identifiedPlant1);

    return(
        <SafeAreaView style={styles.identifiedPlantContainer}>
          <FlatList
            contentContainerStyle={styles.subtitleView}
            data={identifiedPlant1}
            renderItem={renderItem}
            keyExtractor={(item) => item.botanicalName}
            extraData={selectedId}
          />
        </SafeAreaView>
    )
  }


  async function saveCameraPhotoFunction(selectedPlantToSave) { 
    let patchImg = "";
       
    if (cameraPhoto.height) patchImg = cameraPhoto.base64;
    else if (cameraRollImage.localUri) patchImg = cameraRollImage.base64;
       
    // console.log(patchImg);
    
    try {
      const apiResponse = await axios.patch
      (`https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta/users/${userName}/plants/${selectedPlantToSave.plant_id}/image`,
       {img: patchImg} )

       setLoading(true)
      const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
      await waitFor(4000);
      setLoading(false)
      if (apiResponse.status === 200) saveNotifier(selectedPlantToSave)
    } catch (err) {
      console.log(err, "<<<<<err");
      
    }
    // console.log(cameraPhoto)

  }

  if (loading) {
    return (
      <View style={styles.loading}>
      <Text style={styles.loadingText}>loading...</Text>
      <ActivityIndicator size='large' animating={true} color={Colors.green800} />
    </View>
    );
  }
  // console.log(userPlants)
  // console.log(userPlantsNames)

  // after got photo, identify or save
  if (cameraPhoto.height !== "" || cameraRollImage.localUri !== ""){
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style={styles.choosePhoto}>
        <ImageBackground
          imageStyle={{ opacity: 0.4 }}
          source={{ uri: item.image }}
          style={styles.imagebackground}
        >
          <View style={styles.selectPhotoText}>
          <Text style={[styles.title, textColor]}>{item.nickName}</Text>
          <Text style={[styles.subtitle, textColor]}>{item.commonName}</Text>
          </View>
          {/* <Avatar source={{ uri: item.image_url }} /> */}
        </ImageBackground>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#082d0fff";
      const color = item.id === selectedId ? "white" : "#dee5e5ff";
  
      return (
        <Item
          item={item}
          onPress={() => saveCameraPhotoFunction(item)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
console.log(identifiedPlant1);

    return(
        <SafeAreaView style={styles.photoContainer}>
          <FlatList
            contentContainerStyle={styles.subtitleView}
            data={userPlants}
            renderItem={renderItem}
            keyExtractor={(item) => item.plant_id}
            extraData={selectedId}
          />
        </SafeAreaView>
    )}

 //taking photo function
  const takePhoto = async () => {
 if (cameraRef) {    // Was - if(cameraRef)
   console.log("In take photo")
  //  console.log(cameraRef)
   try{
     let photo = await cameraRef.current.takePictureAsync({
       allowsEditing: true,
       aspect: [4, 3],
       quality: 0.5,
       base64: true,

     })
     if (cameraOption === "identify") {
        makeApiCall(photo.base64)
     } else if (cameraOption === "newPhoto") {
      setCameraPhoto(photo)
     }
    //  return photo
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
                    <MaterialCommunityIcons style={styles.text} name="rotate-3d-variant" size={26} />
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.cameraButton}
                   onPress={async () => {
                     const r = await takePhoto()
                    
                  }}
                   >

                   <Text style={styles.text}>Take Photo   </Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.cameraButton}
                   onPress={async () => {
                     const r = await openImagePickerAsync()
                    
                  }}
                   >

                   <Text style={styles.text}>   Camera Roll</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.cameraButton}
                   onPress={() => {
                    setCameraRollImage({localUri:"", base64:""})
                    setHaveCameraPermission("")
                    setCameraPhoto({height:"", uri:"", width:"", base64:""})
                   }}
                   >

                    <MaterialCommunityIcons style={styles.text} name="close" size={26} />
                   </TouchableOpacity>
                 </View>
               </Camera> 
               
             </View>
           );

  }
  //1st screen displayed
  
   
  return (
    
    <View style={styles.container}>

      <Image source={takePicture} style={styles.mainImg}/>
      {/* <Text>Push button to select from camera roll to add plant to your inventory</Text> */}

      <Text style={{fontSize: 15, fontWeight: "500", color: "#004346"}}>Identify a plant or set a custom image to your plants!</Text>
      <TouchableOpacity onPress={() => {
          setCameraOption("identify")
          openCameraAsync()
        }
      } style={styles.button}>
        <Text style={styles.buttonText}>Identify</Text>
        <MaterialCommunityIcons style={styles.buttonText} name="magnify" size={26} />
      </TouchableOpacity>
      {/* <Text> Push button to open camera, then you can add a photo to your plant or identify a new plant</Text> */}
      <TouchableOpacity onPress={() => {
          setCameraOption("newPhoto")
          openCameraAsync()
        }
      } style={styles.button}>
        <Text style={styles.buttonText}>New Photo</Text>
        <MaterialCommunityIcons style={styles.buttonText} name="image-frame" size={26} />
      </TouchableOpacity>
    </View>
  )
 
}


export default CameraScreen

// >>>>> Break >>>>>

