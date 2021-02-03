'use strict'

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import { VARIETIES_LABELS } from 'constants/varieties'
import STATES from 'constants/states'
import PersonalityIcon from 'components/PersonalityIcon'
import { colors } from 'theme'

import styles from './styles'

const GENERIC_BOTTLE = require('images/generic_bottle.png')

class WineCard extends React.Component {

  _varieties() {
    return this.props.data.varieties.map((varietie) => {
      return _.capitalize(VARIETIES_LABELS[varietie])
    })
  }

  render() {
    const { data, onPress, recommendWine } = this.props
    let location = data.winery.state ? _.find(STATES, { id: data.winery.state }) : {}
    let userSuggestion = _.reduce(data.vintages, (red, n) => {
      return n.userSuggestion && red
    }, true)

    return (
      <View style={[styles.card, recommendWine && { alignItems: 'center' }]} elevation={2}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <View style={[styles.info, { width: '100%' }]}>
            <View style={styles.winePicture}>
              {data.picture ?
                <Image
                  source={{ uri: 'https://newapi.vinoapp.co/api/images/' + data.picture }}
                  style={{ width: 45, height: 110 }}
                  height={110}
                  width={45}
                  resizeMode={'contain'}
                /> :
                <Image source={GENERIC_BOTTLE} />
              }
            </View>

            <View style={styles.content}>
              <Text style={styles.wineName}>{data.name}</Text>
              <Text style={styles.varieties} >{this._varieties().join(' - ')}</Text>
              <Text style={styles.wineryName}>{data.winery.name}</Text>
              {location ?
                <Text style={styles.infoTxt}>{location.name}{data.zone ? ', ' + data.zone.name : ''}</Text> : null
              }
            </View>

            {
              !userSuggestion &&
              <View style={{ flex: 1.8, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.averageContainer}>
                  <Text style={styles.averageValue}>
                    {data.averageScore}
                  </Text>
                  <Text style={styles.averageLabel}>{I18n.t('wine.points')}</Text>
                </View>
              </View>
            }

            {
              userSuggestion &&
              <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.averageContainer}>
                  <Icon name={'md-contact'} size={36} color={colors.primaryColor} />
                  <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 8, color: '#34404c', textAlign: 'center' }}>User{'\n'}Suggestion</Text>
                </View>
              </View>
            }
          </View>
        </TouchableOpacity>
        {/*     <View style={ styles.extra }>
            <View style={ styles.badgesContainer}>
              {
                data.vintages && data.vintages[0].personality.map(personality => {
                  return <PersonalityIcon name={ personality } key={ personality } width={ 35 } height={ 35 } />
                })
              }
            </View>

            <View>
              <Text style={ styles.avgScore }>
                { data.avgScore ? data.avgScore : 0 } <Icon name='md-star' size={ 20 } color={'#f2c305'} />
              </Text>
            </View>
          </View> */}
      </View>
    )
  }
}

export default WineCard
