import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated'
import { BUTTON_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT } from './constants'

interface ArtworkProps {
    y: Animated.Value<number>
}

const {height} = Dimensions.get('window')

export default function Artwork({y} : ArtworkProps) {

    const scale = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT, 0],
        outputRange: [6, 1],
        extrapolateRight: Extrapolate.CLAMP
    })

    const opacity = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT, 0, HEADER_DELTA],
        outputRange: [0, 0.2, 1],
    })

    return (
        <Animated.View style={[styles.artworkContainer, {
            transform: [{scale}]
        }]}>
            <Image source={require('./artwork.png')} style={styles.artwork} />
            <Animated.View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity}} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    artworkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT
    },
    artwork: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    }
})
