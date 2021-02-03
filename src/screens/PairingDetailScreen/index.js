import { Navigation } from 'react-native-navigation'
import PairingDetailScreen from './containers/PairingDetailScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => PairingDetailScreen, store, provider)
}
