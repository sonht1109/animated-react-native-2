import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { interpolate } from 'react-native-reanimated'
import { BUTTON_HEIGHT, MAX_HEADER_HEIGHT } from './constants'
import songs from './songs'
import { onScrollEvent } from 'react-native-redash/lib/module/v1';
import { MINIMIZED_PLAYER_HEIGHT } from '../SpotifyBottomSheet'

interface ListProps {
    y: Animated.Value<number>,
    artist: string
}

export default function List({ y, artist }: ListProps) {

    const trackElement = (item: any, index: number) => {
        return (
            <View key={'track' + index} style={styles.track}>
                <View style={{ justifyContent: "center", marginRight: 20 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        {index + 1}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 18, lineHeight: 30 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: "#aaa" }}>
                        {item.artists}
                    </Text>
                </View>
            </View>
        )
    }

    // const gradientHeight = interpolate(y, {
    //     inputRange: [-MAX_HEADER_HEIGHT, 0],
    //     outputRange: [0, MAX_HEADER_HEIGHT]
    // })
    
    const artistOpacity = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT/2, 0, MAX_HEADER_HEIGHT/2],
        outputRange: [0, 1, 0]
    })

    return (
        <Animated.ScrollView
            style={styles.container}
            scrollEventThrottle={16}
            onScroll={onScrollEvent({y})}
            contentContainerStyle={{paddingBottom: MINIMIZED_PLAYER_HEIGHT}}
        >
            {/* header cover */}
            <Animated.View style={styles.cover}>
                {/* linear gradient */}
                <Animated.View style={[styles.gradient]}>
                    <LinearGradient
                        style={[StyleSheet.absoluteFill]}
                        start={{ x: 0, y: 0.3 }}
                        end={{ x: 0, y: 1 }}
                        colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']}
                    />
                </Animated.View>
                <Animated.View style={[styles.artist, {opacity: artistOpacity}]}>
                    <Animated.Text style={{ color: "white", fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
                        {artist}
                    </Animated.Text>
                </Animated.View>
            </Animated.View>
            {/* list songs */}
            <View>
                {
                    songs.map((item: any, index: number) => {
                        return trackElement(item, index)
                    })
                }
            </View>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    track: {
        backgroundColor: "black",
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    cover: {
        height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    artist: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 40
    },
})
