import { Dimensions, Platform, StatusBar } from 'react-native';

const {height} = Dimensions.get('window')
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export const MIN_HEADER_HEIGHT = 64 + STATUSBAR_HEIGHT
export const MAX_HEADER_HEIGHT = height * 0.4
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT