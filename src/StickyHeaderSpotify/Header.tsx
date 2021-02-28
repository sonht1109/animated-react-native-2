import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import { BUTTON_HEIGHT, HEADER_DELTA, MIN_HEADER_HEIGHT } from './constants';

interface HeaderProps{
    y: Animated.Value<number>,
    artist: string
} 

export default function Header({y, artist} : HeaderProps) {

    const bgOpacity = interpolate(y, {
        inputRange: [HEADER_DELTA - BUTTON_HEIGHT, HEADER_DELTA - BUTTON_HEIGHT/2],
        outputRange: [0, 1]
    })

    const textOpacity = interpolate(y, {
        inputRange: [HEADER_DELTA - 8, HEADER_DELTA],
        outputRange: [0, 1]
    })

    return (
        <Animated.View style={[styles.header, {opacity: bgOpacity}]}>
            <Animated.Text style={[styles.headerText, {opacity: textOpacity}]}>
                {artist}
            </Animated.Text>
        </Animated.View>
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
