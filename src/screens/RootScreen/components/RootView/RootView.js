import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {View, Text, ImageBackground, Image, StatusBar} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { SCREEN_IDS, getNavConfiguration, } from 'screens'
import iconsToLoad from 'config/IconsToLoad'
import { colors } from 'theme'

//const SPLASH = require('images/splash/splash.png')
//const MAIN_LOGO = require('images/splash/logo.png')
const MAIN_LOGO = require('images/splash/vino_front_logo.png')

/**
 * Root View Component
 * Only serve as a loading page to load the persist state from local storage
 * and determine the user state in the app flow (auth, onboarding, etc)
 */
class RootView extends React.Component {
  constructor(){
    super()
    StatusBar.setBarStyle('light-content')
    StatusBar.setBackgroundColor(colors.primaryColor)
  }

  componentWillMount() {
   /*  this.props.navigator.setStyle({
      statusBarTextColorScheme: 'light',
      statusBarColor: colors.primaryColor,
    }) */
    
    this.props.loadIcons(iconsToLoad)
    // Will only occur if user logs out of currently loaded app
    if (this.props.loaded) {
      // this.props.navigator.resetTo({
      //   screen: SCREEN_IDS.WELCOME,
      //   animationType: 'fade',
      // })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded && nextProps.iconsLoaded) {
      if (nextProps.zonesLoaded) {
        if (nextProps.token || nextProps.guest) {
          const { icons, } = nextProps
          Navigation.startTabBasedApp(getNavConfiguration(icons))
        } else {
          this.props.navigator.resetTo({
            screen: SCREEN_IDS.ONBOARDING,
            animationType: 'fade',
          })
        }
      } else {
        this.props.fetchZones()
      }
    }
  }

  render() {
    const { iconsLoaded, loaded, } = this.props


    return (
       /*  <ImageBackground source={ SPLASH } style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Image source={ MAIN_LOGO } />
      </ImageBackground> */
      <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center', }}>
        <Image source={ MAIN_LOGO } />
        <Text style={{ marginTop: 15, fontFamily: 'Raleway-Regular', fontSize: 18, color: '#fff', textAlign: 'center' }}>The App of{'\n'}Argentine Wine</Text>
      </View>
    )
  }
}

RootView.propTypes = {
  loaded: PropTypes.bool,
  token: PropTypes.string,
  navigator: PropTypes.object.isRequired,
}

export default RootView
