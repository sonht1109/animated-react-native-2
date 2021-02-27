import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { usePanGestureHandler, useValue, useClock, minus, clamp, timing } from "react-native-redash/lib/module/v1";
import Animated, { add, cond, eq, set, useCode } from 'react-native-reanimated'
import {snapPoint} from 'react-native-redash'

const {width, height} = Dimensions.get('window')
const HEIGHT = 60

export default function SwipeToDelete() {

    const { gestureHandler, translation, state, velocity } = usePanGestureHandler()
    const translateX = useValue(0)
    const offsetX = useValue(0);
    const clock = useClock();
    const snapPoints = [-width, -100, 0];
    const to = snapPoint(translateX, velocity.x, snapPoints)
    const shouldRemove = useValue(0);
    const deleteOpacity = useValue(1);
    const height = useValue(HEIGHT);

    useCode(() => [
        cond(
            eq(state, State.ACTIVE),
            set(translateX, add(offsetX, clamp(translation.x, -9999, minus(offsetX))))
        ),
        cond(eq(state, State.END), [
            set(translateX, timing({ clock, from: translateX, to })),
            set(offsetX, translateX),
            cond(eq(to, -width), set(shouldRemove, 1)),
        ]),
        cond(shouldRemove, [
            set(height, timing({ from: HEIGHT, to: 0 })),
            set(deleteOpacity, 0),
            // cond(not(clockRunning(clock)), call([], onSwipe)),
        ]),
    ], [])

    return (
        <PanGestureHandler {...gestureHandler}>
            <Animated.View style={[styles.row, {
                transform: [
                    { translateX }
                ]
            }]}>
                <Animated.Text style={{ color: "white" }}>This is a line</Animated.Text>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    row: {
        height: HEIGHT,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})
