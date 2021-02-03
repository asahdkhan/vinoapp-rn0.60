
import React from 'react'
import { Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const isIphoneX = Platform.OS === 'ios' && (deviceHeight === 812 && deviceWidth === 375 || deviceHeight === 896 && deviceWidth === 414)
const heartIcon = ({ size }) => (<Icon name="heart-o" size={size} color='#fff'/>)
const bookmarkIcon = ({ size }) => (<Icon name="bookmark-o" size={size} color='#fff'/>)
var fontScale =  Dimensions.get("window").fontScale;
if (Platform.OS === 'ios') fontScale = 1

export default {
  platform    : Platform.OS,
  deviceWidth ,
  deviceHeight,
  isIphoneX   ,
  heartIcon   ,
  bookmarkIcon,
  fontScale
}

