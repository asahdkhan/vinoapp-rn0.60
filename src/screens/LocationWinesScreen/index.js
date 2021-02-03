import { Navigation } from 'react-native-navigation'
import LocationWinesScreen from './containers/LocationWinesScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => LocationWinesScreen, store, provider)
}
