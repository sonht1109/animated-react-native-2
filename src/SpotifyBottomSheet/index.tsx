import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MiniPlayer from './MiniPlayer'
import Player from './Player';
import { timing, usePanGestureHandler, clamp, withSpring } from 'react-native-redash/lib/module/v1';
import Animated, { Clock, clockRunning, cond, interpolate, not, set, useCode, Value } from 'react-native-reanimated';

export const MINIMIZED_PLAYER_HEIGHT = 60
const { height } = Dimensions.get('window')
const SNAP_TOP = 0
const SNAP_BOTTOM = height - MINIMIZED_PLAYER_HEIGHT
const config = {
    damping: 40, // do giam xoc
    mass: 1, // khoi luong
    stiffness: 300, // do cung
    overshootClamping: false,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.1
}

export default function SpotifyBottomSheet() {

    const { gestureHandler, translation, state, velocity } = usePanGestureHandler()
    const offsetY = new Value(SNAP_BOTTOM)

    const translateY = withSpring({
        value: clamp(translation.y, SNAP_TOP, SNAP_BOTTOM),
        velocity: velocity.y,
        offset: offsetY,
        state,
        snapPoints: [SNAP_TOP, SNAP_BOTTOM],
        config
    })
    const miniPlayerOpacity = interpolate(translateY, {
        inputRange: [
            SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
            SNAP_BOTTOM
        ],
        outputRange: [0, 1]
    })

    const goUp: Animated.Value<0|1> = new Value(0)
    const goDown: Animated.Value<0|1> = new Value(0)
    const clock = new Clock()

    useCode(() => [
        cond(goUp, [
            set(offsetY, timing({clock, from: SNAP_BOTTOM, to: SNAP_TOP})),
            cond(not(clockRunning(clock)), [
                set(goUp, 0)
            ])
        ]),
        cond(goDown, [
            set(offsetY, timing({clock, from: SNAP_TOP, to: SNAP_BOTTOM})),
            cond(not(clockRunning(clock)), [
                set(goDown, 0)
            ])
        ]),
    ], [])

    return (
        <PanGestureHandler {...gestureHandler}>
            <Animated.View style={[styles.bottomContainer, {
                transform: [{ translateY }]
            }]}>
                <Player
                {...{translateY, SNAP_BOTTOM, SNAP_TOP}}
                onGoDown={() => goDown.setValue(1)}
                />
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: MINIMIZED_PLAYER_HEIGHT,
                    opacity: miniPlayerOpacity
                }}>
                    <MiniPlayer onGoUp={() => goUp.setValue(1)} />
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        ...StyleSheet.absoluteFillObject,
    }
})
