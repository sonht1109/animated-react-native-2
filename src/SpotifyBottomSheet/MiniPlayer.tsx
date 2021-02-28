import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import recentTrack from './recentTrack'

export default function MiniPlayer({onGoUp}: any) {
    const {artist, name} = recentTrack
    return (
        <TouchableWithoutFeedback>
            <View style={styles.miniPlayer}>
                <Icon name='heart-outline' size={24} color="white" />
                <Text style={{color: "white"}}>{name} - {artist}</Text>
                <Icon name='play-circle-outline' size={24} color="white" onPress={onGoUp} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    miniPlayer: {
        flex: 1,
        backgroundColor: "#272829",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    }
})
