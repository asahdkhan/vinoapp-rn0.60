import React from 'react'
import {View, Text, Image, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import RaitingBar from 'components/RaitingBar'
import moment from 'moment'
import Config from 'react-native-config'

import styles from './styles'

class MentionCardComponent extends React.Component {

  _goDetail = () => {
    type = this.props.object.target.wine ? 'wine' : 'winery'
    this.props.onPress(type, this.props.object.target[type])
  }

  _buildTitle() {
    let { periodType, wine, winery } = this.props.object.target

    if (wine) {
      return periodType == 'month' ? I18n.t('feed.wine_of_month') : I18n.t('feed.wine_of_week')
    } else if (winery) {
      return periodType == 'month' ? I18n.t('feed.winery_of_month') : I18n.t('feed.winery_of_week')
    }
  }

  render() {

    let content = I18n.locale.substr(0,2) == 'en' ? 
      this.props.object.target.content : 
      this.props.object.target.content_es ? this.props.object.target.content_es : this.props.object.target.content
    
    return (
      <View elevation={2} style={[ styles.card, styles.badgeCard ]}>
        <TouchableOpacity style={{}} onPress={ this._goDetail }>
          <View style={[ styles.cardBody, styles.badgeCardBody ]}>
            <View>
              {!_.isEmpty(this.props.object.target.wine) ?
                <View style={{  width: 38, flex: 0, height: 90 }}>
                  { this.props.object.target.wine.picture ?
                    <Image 
                      source={{ uri : Config.MEDIA_BASE + '/' + this.props.object.target.wine.picture }} 
                      height={90} 
                      width={38} 
                      style={{ width:38, height: 90}} 
                      resizeMode={'contain'} />:
                    <Image source={ require('images/generic_bottle.png') } />
                 }
                </View> : 

                <View style={{ overflow: 'hidden', borderRadius: 40}}>
                  { this.props.object.target.winery.logo ?
                    <Image source={{ uri : Config.MEDIA_BASE + '/wineries/' + this.props.object.target.winery.logo }} width={ 40 } height={ 40 } style= {{ height:40, width: 40 }} /> : 
                    <Icon name="md-person" size={30} style={{ opacity: 0.7 }} color={'#FFF'} />
                  }
                </View>
              }

            </View>

            {!_.isEmpty(this.props.object.target.wine) ? 
              <View style={{ flex: 1, marginLeft: 15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 18, color: '#6d1d61' }} >{ this._buildTitle() }</Text>
                  <Text style={ styles.date }>{ moment(this.props.object.target.date).format('MM/DD/YYYY') }</Text>
                </View>

                { content ? 
                  <View style={{ marginBottom: 15 }}>
                    <Text style={ styles.text } numberOfLines={10}>
                      { content }
                    </Text> 
                  </View> : null
                }

                <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 15, color: '#444', marginTop: 5 }}>
                  { this.props.object.target.wine.name}
                </Text>
                <Text style={{ fontFamily: 'GothamRounded-Book', fontSize: 15, color: '#777', marginBottom: 0, marginTop: 0 }}>
                  { this.props.object.target.wine.winery.name}
                </Text>
                <Text style={{ fontFamily: 'GothamRounded-Book', fontSize: 15, color: '#777', marginBottom: 15}}>
                  { _.capitalize(this.props.object.target.wine.type) } Wine
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <RaitingBar raiting={ this.props.object.target.wine.avgScore ? this.props.object.target.wine.avgScore : 0 } size={25} />
                  <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 18, color: '#6d1d61' }}>{ this.props.object.target.wine.averageScore } {I18n.t('feed.points')} </Text>
                </View>
              </View> :

              <View style={{ flex: 1, marginLeft: 15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 18, color: '#6d1d61' }} >{ this._buildTitle() }</Text>
                  <Text style={ styles.date }>{ moment(this.props.object.target.date).format('MM/DD/YYYY') }</Text>
                </View>
                <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 15, color: '#34a06a'}}>
                  { this.props.object.target.winery.name} 
                </Text>
                <Text style={{ fontFamily: 'GothamRounded-Medium', fontSize: 15, color: '#34a06a', marginBottom: 15}}>
                  { this.props.object.target.winery.state ? this.props.object.target.winery.state.name : '' }
                  { this.props.object.target.winery.zone ? ' - ' + this.props.object.target.winery.zone.name : '' }
                </Text>
              </View>
            }
            <View style={{ position: 'absolute', right: 15, top: 15}}>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


export default MentionCardComponent