import { Navigation } from 'react-native-navigation'
import ExpertListing from './containers/ExpertListingContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ExpertListing, store, provider)
}
