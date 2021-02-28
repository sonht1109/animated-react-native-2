import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BUTTON_HEIGHT, MIN_HEADER_HEIGHT } from './constants';

interface HeaderProps{
    y: Animated.Value<number>,
    artist: string
} 

export default function Header({y, artist} : HeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{artist}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        height: MIN_HEADER_HEIGHT,
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
})
