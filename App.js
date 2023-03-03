import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot';

import ImageViewer from "./components/ImageViewer"
import Button from "./components/Button"
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';



let placeholder = require("./assets/images/background-image.png")

export default function App() {
  let [status, requestPermission] = MediaLibrary.usePermissions()
  let [selectedImage, setSelectedImage] = useState(null)
  let [showAppOptions, setShowAppOptions] = useState(false)
  let [isModalVisible, setIsModalVisible] = useState(false)
  let [pickedEmoji, setPickedEmoji] = useState(null)
  let imageRef = useRef()

  if(status === null){
    requestPermission()
  }

  let pickImageAsync = async() =>{ 
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, quality: 1})

    if(!result.canceled){
      console.log(result)
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert("you did not pick any images")
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true)
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
     try{
      let localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1
       })

       await MediaLibrary.saveToLibraryAsync(localUri)

       if(localUri){
        alert("saved")
       }
     }catch (e){
        console.log(e)
     }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imagecontainer}>
        <View collapsable={false} ref={imageRef}>
          <ImageViewer placeholderImageSource={placeholder} selectedImage = {selectedImage} />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>

      {showAppOptions ? 
       <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="reset" onPress={onReset} />
            <CircleButton onPress = {onAddSticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync} />
          </View>
       </View>   
      :     
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={()=> {setShowAppOptions(true)}} />
      </View>
      }

      <EmojiPicker isActive={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecontainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
 
});
