import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BUTTON_HEIGHT } from './constants'
import Icon from 'react-native-vector-icons/Ionicons'

export default function ShuffleButton() {
    return (
        <TouchableOpacity
            activeOpacity={0.95}
            style={styles.button}
        >
            <Text
            style={{color: 'white', textAlign: 'center', fontWeight: 'bold', letterSpacing: 1,}}>
                Shuffle
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: BUTTON_HEIGHT,
        backgroundColor: "#1ed760",
        justifyContent: "center",
        width: 200,
        borderRadius: BUTTON_HEIGHT / 2,
    }
})
