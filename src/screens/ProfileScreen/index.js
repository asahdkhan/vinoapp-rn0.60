import { Navigation } from 'react-native-navigation'
import ProfileScreen from './containers/ProfileScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ProfileScreen, store, provider)
}
