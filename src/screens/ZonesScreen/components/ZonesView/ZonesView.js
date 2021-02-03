import React from 'react'
import _ from 'lodash'
import { View, Text, FlatList, Dimensions, TouchableOpacity, ImageBackground, } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS } from 'screens'
import NavStyles from 'theme/NavigatorStyles'

import styles from './styles'

class ZonesView extends React.Component {
  state = {}

  _renderItem = ({ item, }) => (
    <TouchableOpacity
      style={styles.item}
      key={`zone-${item.id}`}
      activeOpacity={0.8}
      onPress={() => {
        this.props.navigator.push({
          title: `${item.name}`,
          screen: SCREEN_IDS.LOCATION_WINES,
          backButtonHidden: true,
          passProps: {
            zone: item,
          }
        })
      }}
    >
      <Text style={styles.itemLabel}>{item.name}</Text>
      <Icon name='ios-arrow-forward' color={'#4A4A4A'} size={24} />
    </TouchableOpacity>
  )

  _renderFirstItem = () => (
    <TouchableOpacity
      style={styles.item}
      key={`zone-0`}
      activeOpacity={0.8}
      onPress={() => {
        this.props.navigator.push({
          screen: SCREEN_IDS.LOCATION_WINES,
          passProps: {
            state: this.props.location.id,
          }
        })
      }}
    >
      <Text style={styles.itemLabel}>{I18n.t('all')}</Text>
      <Icon name='ios-arrow-forward' color={'#34404c'} size={24} />
    </TouchableOpacity>
  )

  render() {
    const { zones, } = this.props

    return (
      <View style={{ flex: 1, }}>
        <ImageBackground style={styles.header} source={this.props.location.image}>
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>{this.props.location.label}</Text>
          </View>
        </ImageBackground>

        <FlatList
          data={zones}
          keyExtractor={o => o.id}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderFirstItem()}
        />
      </View>
    )
  }
}

export default Screen(ZonesView, {
  title: 'search.zones',
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id: 'backs',
    }],
    rightButtons: [],
  }
})