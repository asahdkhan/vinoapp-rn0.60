import React from 'react'
import { View, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ICONS = {
  EMPTY : 'md-star',
  FULL  : 'md-star'
}

import styles from './styles'

class RateFilter extends React.Component {

  _buildStars() {
    let icons = []

    for(var i=0; i < 5; i++) {
      let value = i + 1

      let style = this.props.selectedRate >= value ? styles.activeIcon : {}
      let icon  = this.props.selectedRate >= value ? ICONS.FULL : ICONS.EMPTY

      icons.push(
        <TouchableOpacity key={ 'star-'+ i } onPress={() => { this.props.onSelectRate(value) }}>
          <Icon name={ icon } size={ this.props.size } style={[ styles.icon, style ]} />
        </TouchableOpacity>
      )
    }

    return icons
  }

  render() {
    return (
      <View style={ styles.viewContainer }>
        { this._buildStars() }
      </View>
    )
  }
}

RateFilter.defaultProps = {
  size: 20,
  selectedRate : 0
}

export default RateFilter
