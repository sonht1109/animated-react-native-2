import React from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import recentTrack from './recentTrack'
import { MIN_HEADER_HEIGHT } from '../StickyHeaderSpotify/constants';

const {width} = Dimensions.get('window')

export default function Player() {
    const {name, artist, artwork} = recentTrack
    return (
        <View style={styles.player}>
            {/* header */}
            <View style={styles.header}>
                <Icon name="chevron-down-outline" size={24} color="white" />
                <Text style={{color: "white"}}>{name}</Text>
                <Icon name="ellipsis-horizontal-outline" size={24} color="white"/>
            </View>
            {/* artwork */}
            <View style={styles.image}>
                <Image source={artwork} style={{...StyleSheet.absoluteFillObject, width: undefined, height: undefined}} /> 
            </View>
            {/* detail */}
            <View style={styles.detail}>
                <View style={{marginVertical: 20}}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                </View>
                <View style={styles.slider} />
                <View style={styles.control}>
                    <Icon name="play-back-outline" size={48} color="white" />
                    <Icon name="play-circle-outline" size={48} color="white" />
                    <Icon name="play-forward-outline" size={48} color="white" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#0b3057"
    },
    header: {
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 20
    },
    image: {
        width: width - 40, height: width - 40,
        alignSelf: 'center',
    },
    detail: {
        paddingVertical: 20,
        flex: 1,
        // justifyContent: 'center'
    },
    name: {
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30
    },
    artist: {
        color: "white",
        textAlign: 'center',
        fontSize: 16
    },
    control: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginVertical: 40
    },
    slider: {
        height: 2,
        backgroundColor: "white",
        marginHorizontal: 20
    }
})
