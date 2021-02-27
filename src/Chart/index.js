import React, { useEffect, useRef } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Animated, TextInput } from 'react-native'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import data from './data'
import * as pathProps from 'svg-path-properties'

const { width } = Dimensions.get('window')
const HEIGHT = 300
const CURSOR_SIZE = 16
const CURSOR_BORDER_WIDTH = 2
const maxValue = 100
const TEXTINPUT_HEIGHT = 40
const TEXTINPUT_WIDTH = 100

const scaleX = scale.scaleTime()
    .domain([data[0].x, data[data.length - 1].x]).range([0, width])
const scaleY = scale.scaleLinear()
    .domain([0, maxValue]).range([HEIGHT, 0])

const line = shape.line()
    .x(d => scaleX(d.x))
    .y(d => scaleY(d.y))
    .curve(shape.curveBasis)(data)

const properties = pathProps.svgPathProperties(line)
const pathLength = properties.getTotalLength()

export default function Chart() {

    const x = new Animated.Value(0)
    const cursorRef = useRef(null)
    const textInputRef = useRef(null)
    const moveCursor = value => {
        const {x, y} = properties.getPointAtLength(value)
        cursorRef.current.setNativeProps({
            top: y - (CURSOR_SIZE + CURSOR_BORDER_WIDTH)/2,
            left: x - (CURSOR_SIZE + CURSOR_BORDER_WIDTH)/2
        })
        textInputRef.current.setNativeProps({
            text: Math.floor(scaleY.invert(y)).toString()
        })
    }

    const inputTranslateXAnimated = x.interpolate({
        inputRange: [0, width],
        outputRange: [0, width - TEXTINPUT_WIDTH],
        extrapolate: "clamp"
    })

    useEffect(() => {
        x.addListener(({ value }) => {
            moveCursor(value)
        })
        moveCursor(0)
    }, [])

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Svg width={width} height={HEIGHT}>
                    {/* linear gradient */}
                    <Defs>
                        <LinearGradient id="grad" x1="50%" y1="0%" x2="50%" y2="100%">
                            <Stop offset="0" stopColor="#cde3f8" stopOpacity="1" />
                            <Stop offset="1" stopColor="#feffff" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    {/* main line */}
                    <Path d={line} stroke="#367be2" fill="transparent" strokeWidth="4" />
                    {/* underpath-area color */}
                    <Path
                        d={`${line} L${width} ${HEIGHT} L 0 ${HEIGHT}`}
                        fill='url(#grad)'
                    />
                    <View ref={cursorRef} style={styles.cursor} />
                </Svg>
                {/* control cursor */}
                <Animated.ScrollView
                    style={{...StyleSheet.absoluteFill}}
                    contentContainerStyle={{
                        width: pathLength * 2,
                    }}
                    horizontal
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    inver
                />
                {/* label */}
                <Animated.View style={[styles.textInput, {
                    transform: [{translateX: inputTranslateXAnimated}]
                }]}>
                    <TextInput ref={textInputRef} />
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    container: {
        width: width,
        height: HEIGHT,
    },
    cursor: {
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: CURSOR_SIZE / 2,
        borderColor: "#367be2",
        borderWidth: CURSOR_BORDER_WIDTH,
        backgroundColor: "white"
    },
    textInput: {
        backgroundColor: "#7da6e3",
        width: TEXTINPUT_WIDTH,
        height: TEXTINPUT_HEIGHT,
        position: 'absolute',
        top: -TEXTINPUT_HEIGHT,
        left: 0
    }
})
