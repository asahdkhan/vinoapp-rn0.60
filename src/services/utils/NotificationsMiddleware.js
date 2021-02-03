import { Platform, } from 'react-native'
import { Navigation } from 'react-native-navigation'
import I18n from 'react-native-i18n'
import firebase from '@react-native-firebase/app'
import { REHYDRATE } from 'redux-persist/constants'
import { SCREEN_IDS } from 'screens'
import * as StartupActionTypes from 'modules/startup/actions'
import modules from 'modules'

const actions = modules.actions.notifications

/**
 * Middleware to manage push notifications.
 * - Token Refresh
 * - Notification Recieved
 * - Notification Opened
 */
export const notificationsMiddleware = () => {
  let binded = false
  return store => next => async action => {
    let enabled = await firebase.messaging().hasPermission()
    if (!binded || !enabled) {
      binded = true
      enabled = await firebase.messaging().hasPermission()

      if (enabled) {
        // We create a channel Android 8+ 
        const channel = new firebase.notifications.Android.Channel(
          'vinoapp-channel',
          'Notification Channel',
          firebase.notifications.Android.Importance.Max
        ).setDescription('VinoApp Channel')
         .setShowBadge(true)

        // Create the channel
        firebase.notifications().android.createChannel(channel)

        // Bind the token event getter
        const fcmToken = await firebase.messaging().getToken()
        if (fcmToken) {
          // user has a device token
          store.dispatch(actions.setToken({ token: fcmToken }))
        }

        firebase.messaging().onTokenRefresh(fcmToken => {
          // Process the token as required (this is required for updates)
          store.dispatch(actions.setToken({ token: fcmToken }))

          const { auth, notifications, user, } = store.getState()
          if (auth.token) {
            store.dispatch(actions.saveToken({
              accountId: user.data.accountId,
              token: newToken,
              lang : I18n.locale.substr(0,2),
              platform: Platform.OS,
            }))
          }
        })

        // Set the event listener for the notifications
        firebase.notifications().onNotification(notification => {
          // Process your notification as required
          console.tron.logs('New Notification Recevied', notification.data)
          if (notification.data.event) {
            store.dispatch(actions.notificationReceived({ 
              notification: JSON.parse(notification.data.event)
            }))
          }
          const { auth } = store.getState()

          if (auth.token) {
            const localNotification = new firebase.notifications.Notification()
              .setNotificationId(notification.notificationId)
              .setTitle(notification.title)
              .setBody(notification.body)
              .setData(notification.data)
            
            localNotification
              .android.setChannelId('vinoapp-channel')
              .android.setSmallIcon('ic_notification')
              .android.setAutoCancel(true)

            firebase.notifications().displayNotification(localNotification)
          }
        })

        firebase.notifications().onNotificationOpened(notificationOpen => {
          // Get information about the notification that was opened
          const notification = notificationOpen.notification
          console.tron.logs('New Notification Opened', notification.data)
          store.dispatch(actions.notificationOpened(notification.data))
          const { auth, } = store.getState()
          if (auth.token) {
            Navigation.showModal({
              screen: SCREEN_IDS.NOTIFICATIONS,
            })
          }
        })
      }
    }

    if (action.type === StartupActionTypes.STARTUP_FINISHED) {
      const { auth, notifications, user, } = store.getState()
      enabled = await firebase.messaging().hasPermission()
      if (auth.token && enabled) {
        const newToken = await firebase.messaging().getToken()
        store.dispatch(actions.saveToken({
          accountId: user.data.accountId,
          token: newToken,
          lang : I18n.locale.substr(0,2),
          platform: Platform.OS,
        }))
      }
    }
    next(action)
  }
}
