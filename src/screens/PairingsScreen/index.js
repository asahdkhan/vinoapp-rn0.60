import { Navigation } from 'react-native-navigation'
import PairingsScreen from './containers/PairingsScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => PairingsScreen, store, provider)
}
