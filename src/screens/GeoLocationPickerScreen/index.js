import { Navigation } from 'react-native-navigation'
import GeoLocationScreen from './containers/GeoLocationScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => GeoLocationScreen, store, provider)
}
