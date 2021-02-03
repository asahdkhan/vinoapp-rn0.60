import { Navigation } from 'react-native-navigation'
import SearchUsersScreen from './containers/SearchUserScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => SearchUsersScreen, store, provider)
}
