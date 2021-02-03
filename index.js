import { AppRegistry, Text, TextInput } from 'react-native'
import App from './src/app'
console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;


AppRegistry.registerComponent('VinoApp', () => App)
