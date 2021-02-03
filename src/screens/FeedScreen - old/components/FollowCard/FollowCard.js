import React from 'react'
import { View, Text, Image, } from 'react-native'
import moment from 'moment'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from 'theme'
import RaitingBar from 'components/RaitingBar'
import styles from './styles'

class FollowCardComponent extends React.Component {
  render() {
    return (
      <View style={[ styles.card, { minHeight: 70 }]} elevation={2}>
        <View style={[ styles.viewContainer ]}>
          <View style={ styles.avatar }>
            { this.props.object.actor.photo ?
              <Image source={{ uri : this.props.object.actor.photo }} width={ 50 } height={ 50 } style= {{ height:50, width: 50 }} /> : 
              <Icon name="md-person" size={30} style={{ opacity: 0.7 }} color={'#FFF'} />
            }
          </View>

          <View style={[ styles.header, { flex: 1, paddingRight: 15, paddingLeft: 15,}]}>
            <Text style={ styles.userName }>{ this.props.object.actor.name }
            <Text style={ styles.secondaryText }> {I18n.t('feed.now_following') } </Text>{ this.props.object.target.name }</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default FollowCardComponent
