import React from 'react'
import Chart from './src/Chart';
import SpotifyBottomSheet from './src/SpotifyBottomSheet';
import StickyHeaderSpotify from './src/StickyHeaderSpotify';
import SwipeToDelete from './src/SwipeToDelete/index';
import { View } from 'react-native';
import PinchToZoom from './src/PinchToZoom';

export default function App() {
  return (
    // <SwipeToDelete />
    <PinchToZoom />
    // <Chart/>
    // <View style={{flex: 1}}>
    //   <StickyHeaderSpotify />
    //   <SpotifyBottomSheet />
    // </View>
  )
}