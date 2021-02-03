import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native'
import _ from 'lodash'

import styles from './styles'

class FilterButton extends React.Component {
  render() {
    let filterButtonActive = this.props.active ? styles.filterButtonActive : {}
    let labelActive = this.props.active ? styles.labelActive : {}

    return (
      <TouchableOpacity style={[ styles.filterButton, this.props.style ? this.props.style : {} , filterButtonActive]} onPress={ this.props.onPress }>
        <Text style={[ styles.label, labelActive ]}>
          { _.upperCase(this.props.label) }
        </Text>
      </TouchableOpacity>
    )
  }
}

export default FilterButton
