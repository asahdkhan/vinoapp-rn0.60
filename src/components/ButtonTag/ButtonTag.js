import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { colors } from 'theme'

class ButtonTag extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={[ styles.viewContainer, this.props.style ? this.props.style : {} ]} 
        onPress={() => { this.props.onPress(this.props.value) }} >
        <Text style={ styles.label }>{ this.props.label }</Text>
        <Icon name="md-close" color={ colors.primaryColor } size={12} />
      </TouchableOpacity>
    )
  }
}

export default ButtonTag
