import { Navigation } from 'react-native-navigation'
import SearchScreen from './containers/SearchScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => SearchScreen, store, provider)
}
