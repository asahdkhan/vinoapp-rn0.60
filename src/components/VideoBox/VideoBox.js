import React from 'react'
import { TouchableOpacity, View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

import styles from './styles'

class VideoBox extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={ this.props.onPress } style={{ width: this.props.width, height: this.props.height }}>
        <ImageBackground source={ this.props.thumb } style={[ styles.thumb ]}>
          <View style={ styles.overlay}>
            <Icon name='play' size={64} color='#FFF' />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default VideoBox
