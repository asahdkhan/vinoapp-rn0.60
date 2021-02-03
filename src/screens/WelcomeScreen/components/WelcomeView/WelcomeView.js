import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, TouchableHighlight, StatusBar, Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import I18n from 'react-native-i18n'
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import { SCREEN_IDS, getNavConfiguration } from 'screens'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'components/Button'
import _ from 'lodash'
import { colors } from 'theme'

import MAIN_BG from 'images/main-bg.png'
import MAIN_LOGO from 'images/login/main.png'

import styles from './styles'

class WelcomeView extends React.Component {

  state = {
    loadingFb: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.token && nextProps.token) {
      const { icons, } = nextProps
      Navigation.startTabBasedApp(getNavConfiguration(icons))
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
    this.setState({
      loadingFb: false,
    })
  }

  _navigate = (screenId) => {
    this.props.navigator.push({
      screen: screenId,
    })
  }

  _fbLogin = () => {
    this.setState({ loadingFb: true, })
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(
        (result) => {
          if (result.isCancelled) {
            this.setState({ loadingFb: false });
          } else {
            AccessToken.getCurrentAccessToken().then((accessToken) => {
              this.props.socialLogin(accessToken.accessToken)
            })
          }
        },
        (error) => {
          this.setState({
            loadingFb: false
          })
        }
      )
  }

  _goToApp = () => {
    const { icons, } = this.props
    this.props.guest(true)
    Navigation.startTabBasedApp(getNavConfiguration(icons))
  }

  render() {
    const marginTop = Platform.OS === 'ios' ? 8 : 0
    return (
      <View source={MAIN_BG} style={styles.viewContainer}>
        <View style={styles.topView}>
          <Image source={MAIN_LOGO} />
          <Text style={styles.welcomeText}>{I18n.t('welcome.title')}</Text>
        </View>

        <View style={styles.bottomView}>
          <Button
            onPress={() => { this._navigate(SCREEN_IDS.LOGIN) }}
            style={styles.buttonSignUp}
            labelStyle={styles.buttonTextSignUp}
            labelStyle={{}}
            label={"LOGIN"}
          />
          <View style={{ marginTop: 15, }} />

          <TouchableOpacity onPress={this._fbLogin} >
            {
              this.state.loadingFb ?
                <View style={[styles.buttonSignUp, { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat-Regular', color: '#3b5998', fontSize: 18 }}>Loading...</Text>
                </View>
                :
                <View style={[styles.buttonSignUp, { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                  <Icon style={{ position: 'absolute', left: 0, paddingLeft: 30 }} name="facebook-f" size={22} color='#3b5998' />
                  <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat-Regular', color: '#3b5998', fontSize: 18 }}>Login with </Text>
                  <Text style={{ textAlign: 'center', marginTop, alignSelf: 'center', fontFamily: 'Klavika-Bold', color: '#3b5998', fontSize: 19 }}>Facebook</Text>
                </View>
            }

          </TouchableOpacity >

          <View style={styles.optionDivider}>
            <View style={styles.divider} />
            <Text style={styles.optionText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <Button
            onPress={() => { this._navigate(SCREEN_IDS.SIGNUP) }}
            style={styles.buttonSignUp}
            labelStyle={styles.buttonTextSignUp}
            labelStyle={{}}
            label={_.upperCase(I18n.t('welcome.sign_up'))}
          />

          <View style={styles.loginMessage}>
            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0)'}
              style={{ marginLeft: 5 }}
              onPress={() => { this._navigate(SCREEN_IDS.FORGOT_PASSWORD) }}
            >
              <Text style={[styles.loginText, { textDecorationLine: 'underline' }]}>Forgot Password</Text>
            </TouchableHighlight>
          </View>

          <View style={{ flexDirection: 'row', backgroundColor: colors.primaryColor }}>
            <Button
              onPress={this._goToApp}
              style={[styles.buttonWinery, { borderRightWidth: 1, borderRightColor: '#CFCFCF' }]}
              labelStyle={styles.buttonTextWinery}
              label={I18n.t('welcome.try_app')}
              action={true}
            />
            <Button
              onPress={() => { this._navigate(SCREEN_IDS.WINERY_ACCESS) }}
              style={styles.buttonWinery}
              labelStyle={styles.buttonTextWinery}
              label={I18n.t('welcome.are_you_wine_producer')}
              action={true}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Screen(WelcomeView, {
  navigatorStyle: NavStyles.welcome,
})