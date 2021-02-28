import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { MAX_HEADER_HEIGHT } from './constants'

export default function Artwork() {
    return (
        <View style={styles.artworkContainer}>
            <Image source={require('./artwork.png')} style={styles.artwork} />
        </View>
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
