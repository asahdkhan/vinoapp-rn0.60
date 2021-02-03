import React from 'react'
import { View, TouchableOpacity, Text, TextInput, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from 'theme'
import _ from 'lodash'

import styles from './styles'

class SettingsField extends React.Component {

  constructor() {
    super()
    this.state = {
      value: '',
      default: '123'
    }
    this.i = 0
  }

  componentWillReceiveProps(nextProps) {
    this.i++
    if (this.i == 1) {
      this.setState({
      })
    }
  }

  _onChange = (e) => {
    this.setState({
      value: e
    });
  }

  render() {
    const {
      label,
      type,
      style,
      input, meta: { touched, error },
      icon,
      autoCapitalize,
      secureTextEntry,
      keyboardType,
      editable = true,
      placeholder,
      multiline = false,
    } = this.props
    return (
      <View style={[styles.viewContainer, multiline && { minHeight: 45, height: 'auto', }]}>
        <View style={styles.label}>
          <Icon name={icon} size={22} style={styles.labelIcon} />
          <Text style={styles.labelText}>{label}</Text>
        </View>

        <TextInput
          defaultValue={input.value}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={[styles.value, error, multiline ? { textAlignVertical: 'top', paddingTop: 20, paddingBottom: 20 } : {}]}
          placeholder={placeholder}
          placeholderTextColor={colors.greyMatterhorn}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType || 'default'}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          returnKeyType="done"
          blurOnSubmit={true}
          editable={editable}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          pointerEvents={!editable ? "none" : 'auto'}
        />
      </View>
    )
  }

}

export default SettingsField
