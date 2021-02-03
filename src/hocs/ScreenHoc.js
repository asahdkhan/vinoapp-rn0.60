import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import firebase from '@react-native-firebase/app'
import I18n from 'react-native-i18n'
import { View, AppState, } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { connect } from 'react-redux'
import { SCREEN_IDS, getNavConfiguration, } from 'screens/screens'
//import NavStyles from 'theme/NavigationStyles'
import modules from 'modules'
import NavigationActions from 'modules/navigation/actions'
import MessageActions from 'modules/messages/actions'

const NotificationActions = modules.actions.notifications

//const VINO_APP_LOGO = require('images/main-iso.png')
//const VINO_APP_LOGO = require('images/dummy/new_MainVinoIcon.png')
const VINO_APP_LOGO = require('images/main/vino.png')
//const settingImg = require('images/action-button/setting.png')
const settingImg = require('images/main/settings.png')

/**
 * Hoc to customize screens in a uniform way
 * and to be able to integrate the flow of navigation with redux.
 * @param {Component} Screen
 * @param {Object} nav configuration object
 */
export const AppScreen = (Screen, { navigatorStyle = {}, navigatorButtons, title, updateOnBackground = false }) => {

  const customStyles = navigatorStyle

  class AppScreenComponent extends React.Component {

    static navigatorStyle = {
      ...customStyles
    }

    constructor(props) {
      super(props)
      props.navigator.setOnNavigatorEvent(this._onNavigatorEvent)
      this.state = {
        snackbarVisible: props.snackbarVisible,
        appState: AppState.currentState,
      }

      if (title) {
        props.navigator.setTitle({
          title: I18n.t(title),
        })
      }

      //TODO: (rfuentes)
      //    - Add check in case the icon doesnt exist.
      //    - Add check if the button is a custom component.
      if (navigatorButtons) {
        this._setButtons(navigatorButtons)
      } else {
        let rightButtons = [
          {
            id: 'settings',
            icon: settingImg,
            // type: 'custom',
          },
          /* {
            id: 'add-user',
            type: 'custom',
            icon: 'md-person-add'
          }, */
        ]
        this._setButtons({
          leftButtons: [{
            id: 'home',
            icon: VINO_APP_LOGO,
          }],
          rightButtons: props.auth.token ? rightButtons : [],
        })
      }

      if (customStyles) {
        props.navigator.setStyle({
          //...NavStyles.main,
          ...customStyles,
        })
      } else {
        props.navigator.setStyle({
          //...NavStyles.main,
        })
      }
    }

    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillReceiveProps(nextProps) {
      const { currentScreenId, testID, snackbarVisible, icons, } = nextProps
      if (this.props.lang !== nextProps.lang && title) {
        this.props.navigator.setTitle({
          title: I18n.t(title),
        })

        let { tabs, } = getNavConfiguration(icons)
        tabs.map((tab, idx) => {
          this.props.navigator.setTabButton({
            tabIndex: idx,
            label: tab.label
          })
        })
      }

      if (currentScreenId === testID &&
        this.props.messages.message !== nextProps.messages.message &&
        nextProps.messages.message
      ) {

        Snackbar.show({
          title: nextProps.messages.message,
          duration: nextProps.messages.duration,
        })

        this.props.dispatch(MessageActions.clearMessage())
      }
    }

    async componentDidUpdate(prevProps, prevState) {
      const { currentScreenId, testID } = this.props
      // This is only called once since we only update the visible screen.
      if (prevState.appState.match(/inactive|background/) && this.state.appState === 'active' && currentScreenId === testID) {
        const notificationOpen = await firebase.notifications().getInitialNotification()
        if (notificationOpen) {
          notification = notificationOpen.notification

          if (notification.data && notification.data.event) {
            this.props.dispatch(NotificationActions.notificationReceived({
              notification: JSON.parse(notification.data.event)
            }))
          }
        }
      }
    }

    shouldComponentUpdate(nextProps) {
      const { currentScreenId, testID, snackbarVisible } = nextProps
      return (currentScreenId === testID || this.props.snackbarVisible !== snackbarVisible || updateOnBackground)
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
      this.setState({ appState: nextAppState })
    }

    /**
     * Here we listen for various navigation event callbacks from navigation library.
     * Note custom events can also be caught in this callback.
     * Note the possible default transition events -> willDisappear -> willAppear -> didDisappear -> didAppear
     */
    _onNavigatorEvent = (event) => {
      // Tie native screen didAppear change into redux
      if (event.id === 'didAppear') {
        this.props.dispatch(NavigationActions.screenChange(this.props.testID))
      }

      // We have full control of the native drawer or other nav button
      if (event.id === 'sideMenu') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true,
        })
      }

      if (event.id === 'settings') {
        this.props.navigator.push({
          screen: SCREEN_IDS.ACCOUNT_SETTINGS,
        })
      }

      if (this.screen && this.screen.onNavigationEvent) {
        if (this.screen.onNavigationEvent(event)) {
          return
        }
      }

      if (event.id === 'backs') {
        this.props.navigator.pop()
      }

      if (event.id === 'close') {
        this.props.navigator.dismissModal()
      }

      if (event.id === 'add-user') {
        this.props.navigator.push({
          screen: SCREEN_IDS.SEARCH_USERS,
        })
      }
    }

    _setButtons = (buttons) => {
      const { icons, } = this.props
      const leftNavButtons = buttons.leftButtons ? buttons.leftButtons.map((button) => {
        return {
          ...button,
          icon: button.type === 'custom' ? icons[button.icon] : button.icon
        }
      }) : [{}]

      const rightNavButtons = buttons.rightButtons ? buttons.rightButtons.map((button) => {
        return {
          ...button,
          icon: button.type === 'custom' ? icons[button.icon] : button.icon
        }
      }) : [{}]

      // Add default navbar buttons instead of empty object, if desired
      this.props.navigator.setButtons({
        leftButtons: leftNavButtons,
        rightButtons: rightNavButtons,
      })
    }

    render() {
      const { currentScreenId, testID, } = this.props

      return (
        <Screen
          {...this.props}
          ref={(screen) => this.screen = screen}
          setNavButtons={this._setButtons}
        />
      )
    }
  }

  AppScreenComponent.propTypes = {
    currentScreenId: PropTypes.string,
    testID: PropTypes.string,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  const mapStateToProps = ({ auth, nav, icons, i18n, messages, }) => {
    return {
      ...nav,
      auth: auth,
      messages: messages,
      icons: icons.icons,
      lang: i18n.lang,
    }
  }

  // We connect the hoc to be able to dispatch the change of screen event.
  return connect(mapStateToProps)(AppScreenComponent)
}

export default AppScreen
