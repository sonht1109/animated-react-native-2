import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Value } from 'react-native-reanimated'
import Artwork from './Artwork'
import Header from './Header'
import List from './List'
import ShuffleButton from './ShuffleButton'
import { BUTTON_HEIGHT, MIN_HEADER_HEIGHT } from './constants';

const artist = "Vu."

export default function StickyHeaderSpotify() {
    const y = new Value(0)
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="transparent" /> */}
            <Artwork y={y} />
            <List y={y} artist={artist} />
            <Header y={y} artist={artist} />
            <View style={{
                position: 'absolute',
                top: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
                left: 0,
                right: 0,
                alignItems: 'center'
            }}>
                <ShuffleButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    }
})
