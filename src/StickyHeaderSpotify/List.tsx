import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import { MAX_HEADER_HEIGHT } from './constants'
import songs from './songs'

interface ListProps {
    y: Animated.Value<number>,
    artist: string
}

export default function List({y, artist} : ListProps) {

    const onScroll = Animated.event(
        [{nativeEvent: {contentOffset: {y}}}],
        {useNativeDriver: true}
    )

    const trackElement = (item: any, index: number) => {
        return(
            <View key={'track'+index} style={styles.track}>
                <View style={{justifyContent: "center", marginRight: 20}}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        {index + 1}
                    </Text>
                </View>
                <View>
                    <Text style={{color: "white", fontSize: 18, lineHeight: 30}}>
                        {item.name}
                    </Text>
                    <Text style={{color: "#aaa"}}>
                        {item.artists}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={onScroll}
        >
            {/* header cover */}
            <Animated.View style={styles.cover}>
                {/* linear gradient */}
                <Animated.View style={[styles.gradient]}>
                    <LinearGradient
                        start={{x: 0, y: 0.3}}
                        end={{x: 0, y: 1}}
                        colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']}
                    />
                </Animated.View>
                <Animated.View style={[styles.artist]}>
                    <Animated.Text style={{color: "white", fontSize: 40, fontWeight: "bold", textAlign: "center"}}>
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
        flex: 1
    },
    track: {
        backgroundColor: "black",
        flexDirection: 'row',
        padding: 10
    },
    cover: {
        height: MAX_HEADER_HEIGHT,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        // alignItems: "center"
    },
    artist: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 40
    }
})
