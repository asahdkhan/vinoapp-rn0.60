import React from 'react'
import _ from 'lodash'
import { View, Text, FlatList, } from 'react-native'
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import LocationsData from 'constants/locations'
//import WineCard from 'components/WineCard'
import VintageCard from 'components/VintageCard'

import styles from './styles'

class LocationWinesView extends React.Component {
  state = {}

  componentWillUnmount() {
  }

  componentDidMount() {
    const { zone, state, page, limit, } = this.props

    let query = zone ?
      { filters: { 'zone.id': zone.id }, page: 0, limit, } :
      { filters: { 'province': state }, page: 0, limit, }

    this.props.search(query)
  }

  //filters: [ "{'zone.id': '577d95924781409844112d89'}, {'winery.state':'5779aa9949138cf8baa3d481'}" ],  page: 0, limit, } : 

  _goToWine = (wine) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      }
    })
  }

  _goToVintage = (vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  _renderItem = ({ item, }) => (
   //<WineCard data={item} onPress={() => { this._goToWine(item) }} />
   <VintageCard data={item} onPress={() => { this._goToVintage(item) }} />
  )

  _renderHeader = () => {
    const { zone, state, total, } = this.props

    let location = zone ?
      _.find(LocationsData, { id: zone.state }).label :
      _.find(LocationsData, { id: state }).label;
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {location} /
          <Text style={styles.listTitle}>{zone ? zone.name : 'All'}</Text>
        </Text>

        <Text style={styles.counter}>
          {total} Results
        </Text>
      </View>
    )
  }

  _getMoreWines = () => {
    let { zone, state, page, limit, total, loading } = this.props

    const hasMore = ((page + 1) * limit) < total

    if (!loading && hasMore) {
      let query = zone ?
        { filters: { 'zone.id': zone.id }, page: (page + 1), limit, } :
        { filters: { 'province': state }, page: (page + 1), limit, }

      this.props.search(query)
    }
  }

  render() {
    const { results, loading, page, } = this.props

    if (loading && page === 0) {
      return (
        <View style={{ minHeight: 120, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            isVisible={true}
            size={30}
            type={'Bounce'}
            color={colors.primaryColor}
          />
          <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
            {I18n.t('loading')}
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={results}
        keyExtractor={o => o.id}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader()}
        ListFooterComponent={() => (
          loading ?
            <View style={{ minHeight: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                isVisible={true}
                size={30}
                type={'Bounce'}
                color={colors.primaryColor}
              />
            </View> : null
        )}
        onEndReached={this._getMoreWines}
        onEndReachedThreshold={0.2}
      />
    )
  }
}

export default Screen(LocationWinesView, {
  //title: 'menu.wines',
  navigatorStyle: {
    ...NavStyles.tab,
    screenBackgroundColor: '#F5F5F5',
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
