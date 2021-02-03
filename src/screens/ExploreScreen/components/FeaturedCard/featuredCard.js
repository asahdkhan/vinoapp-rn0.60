import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'
import Config from 'react-native-config'

import STATES from 'constants/states'
import ZONES from 'constants/zones'

import styles from './styles'

const featuredCardImg = require('images/explore/featuredCard.jpg')

class featuredCardComponent extends React.Component {

  _goDetail = () => {
    if (!this.props.viewForExplore) {
      type = 'wine'
      this.props.onPress(type, this.props.object)
    } else {
      type ='vintage'
      this.props.onPress(type, this.props.object)
    }
  }

  _varieties = (dataByType) => {
    let object = dataByType.varieties
    return (
      object.map((varietie) => {
        return (
          <View style={styles.varieties}>
            <Text style={styles.varietyText} >{varietie}</Text>
          </View>)
      })
    )
  }

  render() {
    let data = this.props.object
    let dataByType = this.props.viewForExplore ? data.wine : data
    //let wineryData = this.props.viewForExplore ? this.props.object : {}
    let location = data.winery.state ? _.find(STATES, { id: data.winery.state }) : {}
    let zone = this.props.viewForExplore ? (data.wine.zone ? _.find(ZONES, { id: data.wine.zone }) : '') : data.zone
    return (
      <View style={[styles.card, { marginBottom: 10 }]}>
        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, }} onPress={this._goDetail}>
          <Image resizeMode='cover' style={{ width: '100%', height: 160 }} source={featuredCardImg} />
          <View style={[styles.imageContainer, styles.shadow]}>
            {!_.isEmpty(dataByType)
              ?
              <View style={{}}>
                {dataByType.picture ?
                  <Image
                    source={{ uri: Config.MEDIA_BASE + '/' + dataByType.picture }}
                    height={234}
                    width={68}
                    style={{ width: 68, height: 234, }}
                    resizeMode={'stretch'}
                  /> :
                  <Image
                    source={require('images/generic_bottle.png')}
                    height={234}
                    width={54}
                    style={{ width: 54, height: 234, }}
                    resizeMode={'stretch'}
                  />
                }
              </View>
              :
              <View />
            }
          </View>
          <View style={{ height: 200, width: 75 + '%', paddingRight: 5, marginTop: 10, marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              {!_.isEmpty(dataByType)
                ?
                <View style={{ marginLeft: 10, }}>
                  <Text style={styles.wineName}>
                    {dataByType.name}
                  </Text>
                  <Text style={styles.wineryName}>
                    {data.winery.name}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 10 }}>
                    {location ?
                      <Text style={styles.location}>{location.name}{zone ? ', ' + zone.name : ''}</Text> : null
                    }
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this._varieties(dataByType)}
                  </View>
                </View>
                :
                <View />
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default featuredCardComponent