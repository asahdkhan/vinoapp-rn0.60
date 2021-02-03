import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, } from 'theme'
import RaitingBar from 'components/RaitingBar'
import I18n from 'react-native-i18n'

import styles from './styles'

class RateCardComponent extends React.Component {

  _goToProfile = () => {
    
  }

  render() {
    return (
      <View style={[ styles.card, { minHeight: 140 }]} elevation={2}>
        <View style={ styles.cardBody }>
          <TouchableOpacity style={ styles.avatar } onPress={ this._goToProfile }>
            { this.props.object.target.user.photo ?
              <Image source={{ uri : this.props.object.target.user.photo }} width={ 40 } height={ 40 } style={{ height:40, width: 40 }} />:
              <Icon name="md-person" size={30} style={{ opacity: 0.7 }} color={'#FFF'} />
            }
          </TouchableOpacity>
          <View style={ styles.header}>
            <Text style={ styles.user }>{ this.props.object.target.user.name }    
            <Text style={ styles.secondaryText }> { I18n.t('profile.rated_it') }</Text></Text>
            <Text style={ styles.date }>{ moment(this.props.object.target.createdAt).fromNow() }</Text>
          </View>
          <View>
            <RaitingBar raiting={ this.props.object.target.points } size={22}  />
            <TouchableOpacity style={{ borderColor: '#CCC', borderWidth: 1, padding: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }} onPress={() => {
                let { vintage, winery, wine } = this.props.object.target
                // Actions.vintageDetail({ 
                //   vintage: vintage , 
                //   winery: winery, 
                //   wine  : wine, 
                //   title: wine.name + ' (' + vintage.year + ')'  
                // }) 
                this.props.onPress('wine', wine)
              }}>
              <View style={{ flex: 1}}>
                <Text style={ styles.wineName }>{ this.props.object.target.wine.name } { this.props.object.target.vintage.year }</Text>
                <Text style={ styles.wineryName }>{ this.props.object.target.winery.name }</Text>
              </View>
              <Icon name="ios-arrow-forward" size={28} color={ colors.secondaryColor } />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default RateCardComponent