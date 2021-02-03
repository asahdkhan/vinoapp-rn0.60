import { Navigation } from 'react-native-navigation'
import WineScreen from './containers/WineScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => WineScreen, store, provider)
}
