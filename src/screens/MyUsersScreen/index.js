import { Navigation } from 'react-native-navigation'
import MyUsersScreen from './containers/MyUsersScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => MyUsersScreen, store, provider)
}
