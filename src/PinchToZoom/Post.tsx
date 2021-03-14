import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import image from './3.jpg';

export default function Post() {
  const scale = new Animated.Value(1);

  const onPinchEvent = Animated.event([
    {nativeEvent: {scale}},
  ], {useNativeDriver: true})

  const onPinchStateChange = e => {
    if(e.nativeEvent.oldState === State.ACTIVE){
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <PinchGestureHandler
    onGestureEvent={onPinchEvent}
    onHandlerStateChange={onPinchStateChange}
    >
      <Animated.View style={styles.post}>
        <Text onPress={() => console.log('press')}>This is a post</Text>
        <Animated.Image
          source={image}
          style={{width: '100%', height: 400, transform: [{scale}]}}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'rgb(200, 200, 200)',
    margin: 10,
    padding: 20
  },
});
