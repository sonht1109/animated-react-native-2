import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Value } from 'react-native-reanimated'
import Artwork from './Artwork'
import List from './List'

const artist = "Vu."

export default function StickyHeaderSpotify() {
    const y = new Value(0)
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="transparent" /> */}
            <Artwork />
            <List y={y} artist={artist}  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
})
