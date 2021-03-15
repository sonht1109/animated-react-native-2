import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  block,
  cond,
  set,
  useCode,
  Value,
  eq,
} from 'react-native-reanimated';
import {
  vec,
  onGestureEvent,
  timing,
  pinchBegan,
  pinchActive,
  translate,
  transformOrigin
} from 'react-native-redash/lib/module/v1';
import image from './image.jpg';

const {width} = Dimensions.get('window');
const imageHeight = 400;

export default function Post() {
  const scale = new Value(1);

  const origin = vec.createValue(0, 0);
  const pinchTranslate = vec.createValue(0, 0);
  const focal = vec.createValue(0, 0);
  const numberOfPointers = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const adjustedFocal = vec.add(
    {
      x: -width - 20 - 40 / 2, // width - postMargin - postPadding
      y: -imageHeight / 2,
    },
    focal,
  );

  // const onPinchEvent = onGestureEvent({
  //   scale,
  //   focalX: focal.x,
  //   focalY: focal.y
  // })

  const onPinchEvent = onGestureEvent({
    scale,
    focalX: focal.x,
    focalY: focal.y,
    state,
    numberOfPointers,
  });

  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(
          pinchActive(state, numberOfPointers),
          vec.set(pinchTranslate, vec.minus(vec.sub(origin, adjustedFocal))),
        ),
        cond(eq(state, State.END), [
          set(pinchTranslate.x, timing({from: pinchTranslate.x, to: 0})),
          set(pinchTranslate.y, timing({from: pinchTranslate.y, to: 0})),
          set(scale, timing({from: scale, to: 1})),
        ]),
      ]),
    [],
  );

  // const onPinchStateChange = e => {
  //   if(e.nativeEvent.state === State.BEGAN){
  //     console.log('begin');
  //     vec.set(origin, adjustedFocal)
  //   }
  //   else if(e.nativeEvent.state === State.ACTIVE){
  //     console.log('active');
  //     vec.set(pinchTranslate, vec.minus(vec.sub(origin, adjustedFocal)))
  //   }
  //   else if(e.nativeEvent.state === State.END){
  //     console.log('end');
  //     set(pinchTranslate.x, timing({from: pinchTranslate.x, to: 0}))
  //     set(pinchTranslate.y, timing({from: pinchTranslate.y, to: 0}))
  //     set(scale, timing({ from: scale, to: 1 }))
  //   }
  // }

  return (
    <PinchGestureHandler
      // onGestureEvent={onPinchEvent}
      {...onPinchEvent}
      // onHandlerStateChange={onPinchStateChange}
    >
      <Animated.View style={styles.post}>
        <Text style={{marginBottom: 5}} onPress={() => console.log('press')}>
          This is a post
        </Text>
        <Animated.Image
          source={image}
          style={{
            width: '100%',
            height: imageHeight,
            zIndex: 10,
            transform: [{scale}, ...translate(pinchTranslate)],
          }}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'rgb(200, 200, 200)',
    margin: 10,
    padding: 20,
    zIndex: 1,
  },
});
