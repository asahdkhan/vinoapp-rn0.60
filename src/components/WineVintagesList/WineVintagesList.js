import React from 'react'
import { View, TouchableOpacity, Text, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import VintageCard from 'components/VintageCard'

import styles from './styles'

class WineVintagesList extends React.Component {
  _buildVintages() {
    let vintages = !_.isEmpty(this.props.vintages) ? this.props.vintages.filter(vintage => {
      return vintage.userSuggestion || (vintage.state === 'complete' && vintage.rateStatus === 'samples_rated')
    }) : []
    vintages = vintages.map(vintage => {
      let data = Object.assign({}, vintage, { wine: this.props.wine })
      return (
        <VintageCard
          key={ 'vintage-' + vintage.year }
          style={[ styles.card, styles.vintageCard ]}
          data={ data }
          onPress={ () => { this.props.onSelect(vintage) }} 
        />
      )
    })
    return vintages
  }

  render() {
    return (
      <View key='vintages' style={ styles.vintagesContainer}>
        <Text style={ styles.vintagesTitle }>{ I18n.t('wine.related_vintages') }</Text>
        { this._buildVintages() }
      </View>
    )
  }
}

export default WineVintagesList
