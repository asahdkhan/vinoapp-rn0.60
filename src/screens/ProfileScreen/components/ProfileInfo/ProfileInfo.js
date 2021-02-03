import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, } from 'react-native'
import I18n from 'react-native-i18n'
import _ from 'lodash'
import { SCREEN_IDS, } from 'screens'
import Spinner from 'react-native-spinkit'
import PieChart from 'react-native-pie-chart'
import RaitingBar from 'components/RaitingBar'
import STATES from 'constants/states'

const sliceColor = ['#6D1D61','#F5D445','#F2ECD9',]

import styles from './styles'

class ProfileInfo extends React.Component {
  state = {
    pieWidth : false,
  }

  _onPieContainerLayout = (evt) => {
    this.setState({ pieWidth: evt.nativeEvent.layout.width * 0.6, })
  }

  _buildReviewsByType() {
    let total = _.reduce(this.props.info.rates, (result, rate) => {
      if (rate.wine) {
        result[rate.wine.type] = result[rate.wine.type] + 1
      }
      return result;
    },{ red: 0, white: 0, rose: 0}); 

    return {
      red : total.red == 0 ? 0.1 : total.red * 100,
      white : total.white == 0 ? 0.1 : total.white * 100,
      rose : total.rose == 0 ? 0.1 : total.rose * 100
    }
  }

  _buildReviewsByState() {
    if (this.props.info.rates.length == 0 ) return [];

    let grouped = _.groupBy(this.props.info.rates, (val) => {
      return val.winery.state;
    });
    let list = [];

    for(let group in grouped) {
      let location = _.find(STATES, { id: group });
      if (location) {
        list.push(
          <Text style={ styles.genericText } key={group}>{ location.name }: { grouped[group].length}</Text>
        )
      }
    }

    return list;
  }

  _buildLastRaiting() {
    let lastRates = this.props.info.rates ? this.props.info.rates.map(rate => {
      if (!rate.wine) return <View key={ rate.id } />
      
      return (
        <TouchableOpacity
          key={ rate.id }
          style={ styles.raitingButton }
          onPress={() => { this.props.goToVintage({ ...rate.vintage, wine: rate.wine,}) }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={ styles.raitingWineryName }>{ rate.winery.name }</Text>
            <RaitingBar raiting={ rate.points } />
          </View>
          <Text style={ styles.raitingWineName }>{ rate.wine.name }</Text>
        </TouchableOpacity>
      )
    }) : [];

    return _.clone(lastRates).reverse().slice(0, 3)
  }

  render() {
    const { pieWidth } = this.state
    const { info } = this.props
    const typesValues = this._buildReviewsByType()

    return (
      <ScrollView style={{ flex:1, paddingTop: 5, }}>
        <View style={ styles.row }>
          <View style={ styles.box }>
            <Text style={ styles.boxTitle }>{ I18n.t('profile.wines_tasted') }</Text>
            <View onLayout={ this._onPieContainerLayout } style={ styles.pieContainer }>
              {
                pieWidth &&
                  <PieChart
                    chart_wh={pieWidth}
                    series={[typesValues.red, typesValues.white, typesValues.rose ]}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.85}
                    coverFill={'#FFF'}
                  />
              }
            </View>
          </View>

          <View style={ styles.box }>
            <Text style={ styles.boxTitle }>{ I18n.t('profile.scored_by_province') }</Text>
            <View style={{ marginLeft: 23.5, marginRight: 23.5 }}>
              {
                (info && info.rates.length > 0) ?
                  this._buildReviewsByState() :
                  <View style={{ margin: 10}}>
                    <Text style={{ textAlign: 'center', color: '#999', fontSize: 11, marginTop: 10 }}>You do not have reviews performed</Text>
                  </View>
              }
            </View>
          </View>
        </View>

        <View style={ styles.row }>
          <View style={[ styles.box, styles.bigBox, ]}>
            <Text style={[ styles.boxTitle, { textAlign: 'left' }]}>
              { I18n.t('profile.last_rated_wines') }
            </Text>
            { this._buildLastRaiting() }
          </View>
        </View>
      </ScrollView>
    )
  }

}

export default ProfileInfo
