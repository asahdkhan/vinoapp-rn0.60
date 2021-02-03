import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import _ from 'lodash'
import config from 'react-native-config'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from 'theme'

import RaitingBar from 'components/RaitingBar'
import PersonalityIcon from 'components/PersonalityIcon'

//import BadgeIcon from 'components/badge-icon'
import { VARIETIES_LABELS } from 'constants/varieties'
import styles from './styles'

import STATES from 'constants/states'
import ZONES from 'constants/zones'

import Reactotron from "reactotron-react-native";


const GENERIC_BOTTLE = require('images/generic_bottle.png')

class VintageCard extends React.Component {

  _varieties() {
    return this.props.data.wine.varieties ? this.props.data.wine.varieties.map((varietie) => {
      return _.capitalize(VARIETIES_LABELS[varietie])
    }) : []
  }

  render() {
    const { data } = this.props
    let location = data.province ? _.find(STATES, { id: data.province }) : data.wine.winery ? _.find(STATES, { id: data.wine.winery.state }) : {}
    let zone = data.zone ? _.find(ZONES, { id: data.zone }) : ''
    let raiting = -1

    if (data.userRates) {
      raiting = _.reduce(data.userRates, (sum, n) => {
        return sum + n.points
      }, 0)

      if (data.userRates.length > 0) {
        raiting = Math.round((raiting / data.userRates.length) * 100) / 100
      }
    }

    return (
      <View style={styles.card} elevation={2} >
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
          <View style={styles.info}>
            <View style={styles.vintagePictureContainer}>
              {data.wine.picture ?
                <Image
                  source={{ uri: config.MEDIA_BASE + data.wine.picture }}
                  style={{ width: 45, height: 110 }}
                  height={110}
                  width={45}
                  resizeMode={'contain'}
                /> :
                <Image source={GENERIC_BOTTLE} />
              }
            </View>

            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Text style={styles.wineName}>{`${data.wine.name}`} </Text>
              <Text style={styles.varieties} >{this._varieties().join(' - ')}</Text>
              <Text style={styles.wineryName}>{data.winery.name ? data.winery.name : data.wine.winery.name}</Text>
              {location ?
                <Text style={styles.infoTxt}>{location.name}{zone ? ', ' + zone.name : ''}</Text> : null
              }
            </View>
            {
              <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.yearContainer}>
                  <Icon name={'ios-calendar-outline'} color={colors.primaryColor} size={20} />
                  <Text style={styles.year}>{data.year}</Text>
                </View>
                <View style={styles.averageContainer}>
                  <Text style={styles.averageValue}>
                    {data.rate}
                  </Text>
                  <Text style={styles.averageLabel}>{I18n.t('wine.points')}</Text>
                </View>

                <View style={styles.priceRange}>
                  <Icon name={'logo-usd'} size={14} color={colors.primaryColor} style={styles.priceRangeIcon} />
                  {
                    data.suggestedPrice > 14.99 ?
                      <Icon name={'logo-usd'} size={14} color={colors.primaryColor} style={styles.priceRangeIcon} /> : <Icon name={'logo-usd'} size={14} color={'#999999'} style={styles.priceRangeIcon} />
                  }

                  {
                    data.suggestedPrice > 29.99 ?
                      <Icon name={'logo-usd'} size={14} color={colors.primaryColor} style={styles.priceRangeIcon} /> : <Icon name={'logo-usd'} size={14} color={'#999999'} style={styles.priceRangeIcon} />
                  }
                  {/*<Text style={{ color: '#6d1d61', fontSize: 12}}>{ data.suggestedPrice } USD</Text>*/}
                </View>
              </View>
            }

            {/* {
              data.userSuggestion &&
              <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.yearContainer}>
                  <Icon name={'ios-calendar-outline'} color={colors.primaryColor} size={20} />
                  <Text style={styles.year}>{data.year}</Text>
                </View>
                <View style={styles.averageContainer}>
                  <Icon name={'md-contact'} size={36} color={colors.primaryColor} />
                  <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 8, color: '#34404c', textAlign: 'center' }}>User{'\n'}Suggestion</Text>
                </View>
              </View>
            } */}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default VintageCard


/* {
  <View style={ styles.extra }>
            { !data.userSuggestion &&
              <View style={ styles.badgesContainer}>
                {
                  data.personality && data.personality.map(personality => {
                    return <PersonalityIcon name={ personality } key={ personality } width={ 35 } height={ 35 } />
                  })
                }

                {
                  //BadgeIconComponent
                  //data.badges && data.badges.map(badge => {
                    //return <BadgeIcon key={ badge.id } icon={ badge.image } width={ 35 } height={ 35 } />
                  //})
                }
              </View>
              }

              { !data.userSuggestion &&
                <View>
                  { raiting != -1 ?
                    <Text style={{ fontSize: 17, color: '#6d1d61', fontFamily: 'GothamRounded-Medium'}}>
                      { raiting }<Icon name='md-star' size={ 20 } color={'#f2c305'} />
                    </Text>
                    : null
                  }
                </View>
              }
            </View>
} */