import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MiniPlayer from './MiniPlayer'
import Player from './Player';
import { onGestureEvent, usePanGestureHandler } from 'react-native-redash/lib/module/v1';
import Animated, { add, cond, eq, set, useCode, Value } from 'react-native-reanimated';

export const MINIMIZED_PLAYER_HEIGHT = 60
const { height } = Dimensions.get('window')

export default function SpotifyBottomSheet() {

    const {gestureHandler, translation, state} = usePanGestureHandler()
    const translateY = new Value(0)
    const offsetY = new Value(0)
    // const gestureHandler = onGestureEvent({
    //     state,
    //     translationY,

    // })
    useCode(() => [
        cond(
            eq(state, State.ACTIVE),
            set(translateY, add(offsetY, translation.y))
        ),
        cond(
            eq(state, State.END),
            set(offsetY, translateY)
        )
    ], [])

    return (
        <PanGestureHandler {...gestureHandler}>
            <Animated.View style={[styles.bottomContainer, {
                transform: [{ translateY}]
            }]}>
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: MINIMIZED_PLAYER_HEIGHT
                }}>
                    <MiniPlayer />
                </View>
                {/* <Player /> */}
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        ...StyleSheet.absoluteFillObject,
    }
})
