import React, {EventEmitter, useEffect} from 'react';
// import com.sensormanager.SensorManagerPackage
import { SensorManager } from 'react-native'
import{ Stylesheet, View, Text} from 'react-native'
// import * as Brightness from "expo-brightness"
import { SYSTEM_BRIGHTNESS } from 'expo-permissions';


// non-functional currently

function LightMeterScreen() {

  
// <><><><><><> Break

  // SensorManager.startLightSensor(100)
  // DeviceEventEmitter.addlistener("LightSensor", function(data) {

  // console.log(data)
  // })
  // const sensor = new AmbientLightSensor()
  // sensor.onreading = () => console.log(sensor.illuminance)
  // sensor.onerror = event => console.log(event.error.name, event.error.message)
  // sensor.start()

  // <><><><><><> Break
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Light Meter</Text>
        <Text>Lux meter, requires `sensors` functionality</Text>

      </View>
    );
  }

  export default LightMeterScreen