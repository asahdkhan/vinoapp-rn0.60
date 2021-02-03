import React from 'react'
import { ImageBackground, TouchableOpacity, View, Text, } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

import styles from './styles'

class VideoBox extends React.Component {
  render() {
    const { onPress, height, thumb, } = this.props

    return (
      <TouchableOpacity onPress={ onPress } style={{ height: height }}>
        <ImageBackground source={ thumb } style={[ styles.thumb ]}>
          <View style={ styles.overlay}>
            <Icon name='play' size={64} color='#FFF' />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default VideoBox
