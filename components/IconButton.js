import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet, Text, View } from "react-native"

function IconButton({icon, label, onPress}){
    return(
      
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

let styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItem: 'center'
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12
    }
})

export default IconButton