import reactotron from 'config/Reactotron';
import i18n from 'lang';
import I18n from 'react-native-i18n';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import screens, {SCREEN_IDS, registerScreens} from './screens';
import configureStore from './store';
import WelcomeView from './screens/WelcomeScreen';

const store = configureStore();
 // registerScreens(store, Provider);

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: SCREEN_IDS.ROOT,
//     navigatorStyle: {
//       navBarHidden: true,
//     },
//   },
//   appStyle: {
//     orientation: 'portrait',
//   },
//   animationType: 'fade',
// });

 // Navigation.registerComponent('vinoapp.welcome', () => <View></View>);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'vinoapp.welcome',
            },
          },
        ],
      },
    },
  });
});
