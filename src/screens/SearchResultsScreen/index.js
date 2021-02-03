import { Navigation } from 'react-native-navigation'
import SearchResultsScreen from './containers/SearchResultsScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => SearchResultsScreen, store, provider)
}
