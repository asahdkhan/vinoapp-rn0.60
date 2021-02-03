import { Navigation } from 'react-native-navigation'
import ExpertDetails from './containers/ExpertDetailsContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => ExpertDetails, store, provider)
}
