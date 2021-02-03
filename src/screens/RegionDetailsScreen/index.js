import { Navigation } from 'react-native-navigation'
import RegionDetails from './containers/RegionDetailsContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => RegionDetails, store, provider)
}
