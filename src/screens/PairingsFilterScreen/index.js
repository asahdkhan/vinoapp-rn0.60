import { Navigation } from 'react-native-navigation'
import PairingsFilterScreen from './containers/PairingsFilterScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => PairingsFilterScreen, store, provider)
}
