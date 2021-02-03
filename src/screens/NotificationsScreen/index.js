import { Navigation } from 'react-native-navigation'
import NotificationsScreen from './containers/NotificationsScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => NotificationsScreen, store, provider)
}
