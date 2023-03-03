import { Image, View } from "react-native"
import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler"
import Animated, {useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring} from "react-native-reanimated"

let AnimatedImage = Animated.createAnimatedComponent(Image)
let AnimatedView = Animated.createAnimatedComponent(View)

function EmojiSticker({imageSize, stickerSource}){

    let translateX = useSharedValue(0)
    let translateY = useSharedValue(0)
    let scaleImage = useSharedValue(imageSize)

    let imageStyle = useAnimatedStyle(()=>{
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })
    let containerStyle = useAnimatedStyle(()=>{
        return {
            transform: [{
                translateX: translateX.value
            },
            {
                translateY: translateY.value
            } 
        ]
        }
    })

    const onDoubleTap = useAnimatedGestureHandler({
        onActive: ()=>{
            if(scaleImage.value){
                scaleImage.value = scaleImage.value * 2
            }
        }
    })

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context)=>{
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context)=>{
            translateX.value = event.translationX + context.translateX
            translateY.value = event.translationY + context.translateY
        }
    })
    return(
        <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={[containerStyle, {top: -350}]}>
           <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                <AnimatedImage source={stickerSource} resizeMode='contain' style={[imageStyle, {width: imageSize, height: imageSize}]} />
           </TapGestureHandler>
        </AnimatedView>
        </PanGestureHandler>
    )
}

export default EmojiSticker