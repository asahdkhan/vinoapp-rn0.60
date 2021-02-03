import { Navigation } from 'react-native-navigation'
import LocationScreen from './containers/LocationScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => LocationScreen, store, provider)
}
