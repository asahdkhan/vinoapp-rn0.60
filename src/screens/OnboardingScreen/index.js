import { Navigation, } from 'react-native-navigation'
import OnboardingScreenView from './containers/OnboardingScreenContainer'

export default (id, store, provider) => {
  /** Register the component as screen in the navigation flow */
  Navigation.registerComponent(id, () => OnboardingScreenView, store, provider)
}
