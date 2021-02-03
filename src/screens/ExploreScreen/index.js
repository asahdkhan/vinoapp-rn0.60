import { Navigation } from 'react-native-navigation'
import ExploreView from './containers/ExploreViewContainer'
import { WebView } from 'react-native';

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ExploreView, store, provider)
}
