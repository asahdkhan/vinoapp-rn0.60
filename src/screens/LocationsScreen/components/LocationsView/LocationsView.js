import React from 'react'
import _ from 'lodash'
import { View, Text, ScrollView, Dimensions, } from 'react-native'
import I18n from 'react-native-i18n'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import States from 'constants/states'
import Zones from 'constants/zones'
import LocationsData from 'constants/locations'
import LocationBox from '../LocationBox'

import styles from './styles'

const screenHeight = Dimensions.get('window').height
const screenWidht  = Dimensions.get('window').width

class LocationsView extends React.Component {
  state = {  }

  componentDidMount() {
    this.props.getZonesWineCount()
  }

  _goToLocation = (data, count) => {
    let locationName = data.label;
    let state = _.find(States, { name: locationName });
    let zones = _.filter(Zones, { state: state.id}) || [];

    this.props.navigator.push({
      screen   : SCREEN_IDS.ZONES,
      //backButtonHidden: true,
      passProps: { 
        location: data,
        zones   : zones,
        count: count,
      }
    })
  }

  _goToRegionDetails = (data, count) => {
    this.props.navigator.push({
      screen   : SCREEN_IDS.REGION_DETAILS,
      //backButtonHidden: true,
      passProps: { 
        location: data,
        count: count,
        _goToLocation: () => this._goToLocation(data, count)
      }
    })
  }

  render() {
    const { wineCount, } = this.props

    let realHeight = screenHeight - 70 - 50
    realHeight = realHeight / 3

    let counters = _.reduce(wineCount, (obj, current) => {
      obj[current.key] = current.doc_count ;
      return obj;
    },  {})

    const order = _.orderBy(wineCount, ['doc_count'], ['desc'])
    const bigs = [0,3,4,7,8,11,13,15, ]

    const orderedBox = order.map((location, idx) => {
      let locationData = _.find(LocationsData, { id: location.key}) || {}
      let flex = idx % 2 == 0 ? 4 : 5
      let marginRight = idx % 2 == 0 ? screenWidht*0.01 : 0
      let marginBottom = order.length-3 > idx ? screenWidht*0.01 : 0
      let widths = bigs.indexOf(idx) > -1 ? screenWidht*0.54 : screenWidht*0.44

      return (
        <LocationBox
          key={`location-${idx}`}
          onPress={ () => { this._goToRegionDetails(locationData, counters[locationData.id]) }}
          label={ locationData ? locationData.label : 'Location Not found' }
          image={ locationData ? locationData.image : null }
          count={ counters[locationData.id] }
          style={{ marginBottom, marginRight, height: realHeight, flex: flex, minWidth: widths, width: widths }}
        />
      )
    })


    return (
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', }}>
        { orderedBox }
      </ScrollView>
    )
  }
}

export default Screen(LocationsView, {
  title: 'menu.argentina',
  navigatorStyle: NavStyles.tab,
  navigatorButtons: false
})
