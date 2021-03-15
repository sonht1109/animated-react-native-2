import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Post from './Post';

export default function PinchToZoom() {
  return (
    <View style={styles.container}>
      <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      scrollEventThrottle={16}
      pinchGestureEnabled={true}>
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
