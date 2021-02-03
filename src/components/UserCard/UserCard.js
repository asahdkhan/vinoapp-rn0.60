import React from 'react'
import { View, TouchableOpacity, Text, Image, } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

const UserCard = ({ data, onPress, following, }) => {
  let location = '-'

  if (data.location) {
    let locationArr = data.location.split(',');
    location = locationArr[0]+ ', ' + locationArr[locationArr.length - 1]
  }

  return (
    <TouchableOpacity style={ styles.viewContainer } onPress={() => { onPress(data) }}>
      <View style={ styles.avatarContainer }>
        { 
          data.photo ?
            <Image source={{ uri : data.photo }} width={ 50 } height={ 50 } style={ styles.avatar } /> : 
            <Icon name="md-person" size={35} style={{ opacity: 0.7 }} color={'#FFF'} />
        }
      </View>
      <View style={ styles.infoContainer }>
        <Text style={ styles.userName }>{ data.name }</Text>
        <Text style={ styles.secondaryText }>{ location }</Text>
      </View>
      <View style={ styles.extraInfoContainer }>
        <Text style={{ fontSize: 11, color: '#34a06a', fontFamily: 'GothamRounded-Medium'}}>
          { 
            following ? I18n.t('profile.following') : ''
          }
        </Text>
        { 
          data.rates &&
            <Text style={[ styles.secondaryText, { fontSize: 11 } ]}>
              { data.rates.length } reviews
            </Text>
        }
      </View>
    </TouchableOpacity>
  )
}

export default UserCard