import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, min, multiply, Value } from 'react-native-reanimated'
import Artwork from './Artwork'
import Header from './Header'
import List from './List'
import ShuffleButton from './ShuffleButton'
import { BUTTON_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from './constants';

const artist = "Vu."

export default function StickyHeaderSpotify() {
    const y = new Value(0)
    const buttonTranslateY = multiply((min(y, HEADER_DELTA)), -1)
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent />
            <Artwork y={y} />
            <List y={y} artist={artist} />
            <Header y={y} artist={artist} />
            <Animated.View style={{
                position: 'absolute',
                top: MAX_HEADER_HEIGHT - BUTTON_HEIGHT/2,
                left: 0,
                right: 0,
                alignItems: 'center',
                transform: [{translateY: buttonTranslateY}]
            }}>
                <ShuffleButton />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    }
})
