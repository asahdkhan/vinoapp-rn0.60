import React from 'react'
import { View, FlatList, Text, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { Navigation } from 'react-native-navigation'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import { SCREEN_IDS } from 'screens'
import NotificationItem from '../NotificationItem'

import styles from './styles'

class NotificationsView extends React.Component {

  _openNotification = (notification) => {
    switch(notification.targetType) {
      case 'article' : 
        this.props.navigator.push({
          screen: SCREEN_IDS.ARTICLE,
          passProps: {
            id: notification.targetId,
          }
        })
        break;
      
      case 'profile' : 
        this.props.navigator.showModal({
          screen: SCREEN_IDS.USER,
          passProps: {
            id: notification.targetId,
          }
        })
        break;
      
      case 'winery' : 
        this.props.navigator.push({
          screen: SCREEN_IDS.WINERY,
          title: notification.targetTitle,
          passProps: {
            id: notification.targetId,
          },
        })
        break;

      case 'wine' : 
        this.props.navigator.push({
          screen: SCREEN_IDS.WINE,
          title: notification.targetTitle,
          passProps: {
            id: notification.targetId,
            //wine: object,
          }
        })
        break;

      default : break;
    }

    this.props.readNotification(notification.id)
  }

  _renderItem = ({ item, }) => {
    return (
      <NotificationItem
        notification={ item }
        onOpen={ this._openNotification } 
      />
    )
  }

  render() {
    const { notifications } = this.props

    if (notifications.length === 0) {
      return (
        <View style={{ flex: 1, }}>
          <View style={ styles.placeholder }>
            <Icon name="md-notifications-off" size={48} color='#999' style={{ marginBottom: 10 }} />
            <Text style={ styles.info }>{ I18n.t('empty_notifications') }</Text>
          </View> 
        </View>
      )
    }

    return (
      <FlatList 
        keyExtractor={ n => `n-${n.id}` }
        data={ notifications }
        renderItem={ this._renderItem }
        contentContainerStyle={{ paddingTop: 12, }}
      />
    )
  }
}

export default Screen(NotificationsView, {
  title: 'menu.notifications',
  navigatorStyle: {
    ...NavStyles.tab,
    screenBackgroundColor: '#F5F5F5', 
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id  : 'close',
    }],
    rightButtons: [],
  }
})