import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated'
import { MAX_HEADER_HEIGHT } from './constants'

interface ArtworkProps {
    y: Animated.Value<number>
}

const {height} = Dimensions.get('window')

export default function Artwork({y} : ArtworkProps) {

    const scale = interpolate(y, {
        inputRange: [-height, 0],
        outputRange: [6, 1],
        extrapolate: Extrapolate.CLAMP
    })

    return (
        <Animated.View style={[styles.artworkContainer, {
            transform: [{scale}]
        }]}>
            <Image source={require('./artwork.png')} style={styles.artwork} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    artworkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: MAX_HEADER_HEIGHT
    },
    artwork: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    }
})
