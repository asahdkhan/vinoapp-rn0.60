import React from 'react'
import moment from 'moment'
import { View, Image, Text, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class NotificationItem extends React.Component {

  _open() {
    this.props.onOpen(this.props.notification)
  }

  render() {
    const { notification } = this.props

    return (
      <TouchableOpacity style={ styles.box } onPress={() => { this._open() }}>
        <View style={ styles.avatar }>
          { 
            notification.type == 'general' ? 
              <Icon
                name="md-notifications"
                size={36}
                color={ notification.readed ? "#CFCFCF" : "#9b9b9b" } 
              /> :
              notification.targetIcon == '' ? 
                <Icon
                  name="md-person"
                  size={36}
                  color={ notification.readed ? "#CFCFCF" : "#9b9b9b" } 
                /> :
                <Image source={ notification.icon } />
          }
        </View>

        <View style={{ flex: 1, paddingLeft: 12.5 }}>
          <Text numberOfLines={1} style={[ styles.title, notification.readed ? {} : styles.titleActive ]}>
            { notification.title }
          </Text>
          <Text style={ styles.info } numberOfLines={1}>{ notification.message }</Text>
        </View>

        <View>
          <Text style={ styles.date }>{moment(notification.createdAt).fromNow()}</Text>
          <Text></Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NotificationItem
