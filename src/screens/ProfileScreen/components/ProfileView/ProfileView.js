import React from 'react'
import { View, Platform, ScrollView, Image, Text, TouchableOpacity, SectionList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import Spinner from 'react-native-spinkit'
import PieChart from 'react-native-pie-chart'
import Button from 'components/Button'
import RaitingBar from 'components/RaitingBar'
import STATES from 'constants/states'

import ParallaxScrollView from 'react-native-parallax-scroll-view'
const VINO_APP_LOGO = require('images/main/vino.png')
const settingImg = require('images/main/settings.png')


const sliceColor = ['#6D1D61', '#F5D445', '#F2ECD9',]

import styles from './styles'
import ProfileInfo from '../ProfileInfo';
import Ranking from '../Ranking';
import Favorites from '../Favorites';
import Wishlist from '../Wishlist';

class ProfileView extends React.Component {
  state = {
    tabActive: 1,
  }

  /* componentWillMount() {
    this.props.navigator.setTitle({
      title: I18n.t('menu.profile'),
    })
    this.props.setNavButtons({
      leftButtons: [{
        id: 'home',
        icon: VINO_APP_LOGO,
      }]
    })
  } */

  componentDidMount() {
    this.props.navigator.setTitle({
      title: I18n.t('menu.profile'),
    })
    this.props.setNavButtons({
      leftButtons: [{
        id: 'home',
        icon: VINO_APP_LOGO,
      }]
    })
    if (this.props.token) {
      this.props.getInfo()
      this.props.navigator.setTitle({
        title: I18n.t('menu.profile'),
      })
      this.props.setNavButtons({
        leftButtons: [{
          id: 'home',
          icon: VINO_APP_LOGO,
        }],
        rightButtons: [
          {
            id: 'settings',
            icon: settingImg,
          },
        ]
      })
    }
  }

  /*  onNavigationEvent(event) {
     if (event.id === 'settings') {
       this.props.navigator.push({
         screen: SCREEN_IDS.ACCOUNT_SETTINGS,
       })
     }
   } */

  _changeTab = (idx) => {
    this.setState({ tabActive: idx, })
  }

  _getLocation = () => {
    if (this.props.user && this.props.user.location) {
      let locationArr = this.props.user.location.split(',');
      return locationArr[0] + ', ' + locationArr[locationArr.length - 1];
    }

    return '';
  }

  _goToWine = (wine) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      }
    })
  }

  _goToVintage = (vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  _goToSearch = () => {
    this.props.navigator.switchToTab({
      tabIndex: 2,
    })
  }

  _goToUsers = (type) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.MY_USERS,
      title: I18n.t('profile.' + type),
      passProps: {
        users: this.props.info.profile[type]
      }
    })
  }

  _buildHeader = (user) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            {
              user.photo ?
                <Image
                  source={{ uri: user.photo }}
                  width={70}
                  height={70}
                  style={{ width: 70, height: 70, }} /> : null
            }
          </View>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.location}>{this._getLocation()}</Text>
          </View>
        </View>
      </View>
    )
  }

  _buildContent = () => {
    if (!this.props.info) {
      return <View />
    }
    switch (this.state.tabActive) {
      //    case 0: return <ProfileInfo info={ this.props.info } goToVintage={ this._goToVintage }/>
      case 1: return <Wishlist vintages={this.props.info.wishlist} goToVintage={this._goToVintage} goToSearch={this._goToSearch} />
      case 2: return <Favorites wines={this.props.info.favorites} goToWine={this._goToWine} goToSearch={this._goToSearch} />
      //      case 3: return <Ranking rates={ this.props.info.rates } goToWine={ this._goToWine } />
      default:
        //      return <ProfileInfo info={ this.props.info }/>
        return <Wishlist vintages={this.props.info.wishlist} />
    }
  }

  render() {
    const { user, info, } = this.props
    const { tabActive, pieWidth, } = this.state

    if (!user) {
      return (
        <View style={styles.viewContainer}>
          <View style={{ backgroundColor: colors.primaryColor, marginBottom: 5, }}></View>
          <View key={'welcome-card'} style={[styles.card, styles.badgeCard]} elevation={2}>
            <View style={[styles.cardBody, styles.badgeCardBody, { width: '100%', paddingRight: 90, }]}>
              <View>
                <Image source={require('images/step-2.png')} width={55} height={163} style={{ width: 55, height: 163 }} />
              </View>

              <View style={{ flex: 0, marginLeft: 15 }}>
                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 15, color: colors.primaryColor }}>{I18n.t('feed.welcome_title')}</Text>
                <Text style={{ color: '#34404C', fontSize: 12.5, fontFamily: 'Raleway-Regular', marginTop: 10 }}>{I18n.t('feed.welcome_subtitle')}</Text>
                <Text style={{ color: '#999', fontSize: 12.5, fontFamily: 'Raleway-Regular', marginTop: 15 }}>
                  {I18n.t('feed.welcome_txt')}
                </Text>

                <Text style={{ color: '#34404C', fontSize: 12.5, fontFamily: 'Raleway-Regular', marginTop: 10 }}>{I18n.t('feed.welcome_invitation')}</Text>

                <View>
                  <Button
                    onPress={() => {
                      Navigation.startSingleScreenApp({
                        screen: {
                          screen: SCREEN_IDS.WELCOME,
                          navigatorStyle: {
                            navBarHidden: true,
                          },
                        },
                      })
                    }}
                    rounded={true}
                    style={{ marginTop: 15, }}
                    label={I18n.t('welcome.sign_up')}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    }


    return (
      <View style={styles.viewContainer}>
        {this._buildHeader(user)}
        {/* <View style={{ height: 45, backgroundColor: '#237E50', flexDirection: 'row' }}>
            <TouchableOpacity
              style={ styles.countersButton }
              onPress={() => this._goToUsers('followers') }
            >
              <Text style={ styles.counterValue }>
                { (info && info.profile) ? info.profile.followers.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.followers').toUpperCase() }</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[ styles.countersButton, styles.counterButtonCenter ]}
              onPress={() => this._goToUsers('following') }
            >
              <Text style={ styles.counterValue }>
                { (info && info.profile) ? info.profile.following.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.following').toUpperCase() }</Text>
            </TouchableOpacity>

            <View style={ styles.countersButton }>
              <Text style={ styles.counterValue }>
                { (info && info.profile) ? info.profile.rates.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.ratings').toUpperCase() }</Text>
            </View>
          </View> */}
        <View style={styles.tabsContainer}>
          {/* <TouchableOpacity onPress={() => this._changeTab(0) } style={[ styles.tab, tabActive === 0 && styles.tabActive ]}>
            <Text style={[styles.tabLabel, tabActive === 0 && styles.tabActiveLabel ]}>
              { I18n.t('profile.profile').toUpperCase() }
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => this._changeTab(1)} style={[styles.tab, tabActive === 1 && styles.tabActive, { minWidth: 20, }]} >
            <Text style={[styles.tabLabel, tabActive === 1 && styles.tabActiveLabel]}>
              {I18n.t('profile.wishlist').toUpperCase()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._changeTab(2)} style={[styles.tab, tabActive === 2 && styles.tabActive]}>
            <Text style={[styles.tabLabel, tabActive === 2 && styles.tabActiveLabel]}>
              {I18n.t('profile.favorite').toUpperCase()}
            </Text>
          </TouchableOpacity>
          {/*  <TouchableOpacity onPress={() => this._changeTab(3) } style={[ styles.tab, tabActive === 3 && styles.tabActive ]}>
            <Text style={[styles.tabLabel, tabActive === 3 && styles.tabActiveLabel ]}>
              { I18n.t('profile.ranking').toUpperCase() }
            </Text>
          </TouchableOpacity> */}
        </View>
        {this._buildContent()}
      </View>
    )
  }
}

export default Screen(ProfileView, {
  updateOnBackground: true,
  navigatorStyle: {
    ...NavStyles.tab,
    //drawUnderNavBar  : true,
    // navBarTransparent: true,
    // navBarTranslucent: true,
    //screenBackgroundColor: '#F5F5F5', 
    topBarElevationShadowEnabled: false,
  },
})