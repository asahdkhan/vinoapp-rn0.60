import React from 'react'
import { View, TouchableOpacity, FlatList, Text, StatusBar, Platform, } from 'react-native'
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import firebase from '@react-native-firebase/app'
import ArticleCard from '../ArticleCard'
import UserSuggestionCard from '../UserSuggestionCard'
import RateCard from '../RateCard'
import MentionCard from '../MentionCard'
//import FollowCard from '../FollowCard'
const VINO_APP_LOGO = require('images/main/vino.png')
const settingImg = require('images/main/settings.png')

import styles from './styles'

import { WebView } from 'react-native';

class FeedView extends React.Component {
  state = {}

  constructor(props) {
    super()
    this.props = props
    this.state = { webviewLoaded: false };
  }

  async componentDidMount() {
    StatusBar.setBarStyle('light-content')
    if (this.props.token) {
      //this.props.fetchFeed(0, 300)
      this.props.fetchPublicFeed(0, 10)
      try {
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
          if (Platform.OS === 'android') {
            let newToken = await firebase.messaging().getToken()
            this.props.saveToken({
              accountId: this.props.user.accountId,
              token: newToken,
              lang: I18n.locale.substr(0, 2),
              platform: Platform.OS,
            })
          }
          // let newToken = await firebase.messaging().getToken()
          // this.props.saveToken({
          //   accountId: this.props.user.accountId,
          //   token: newToken,
          //   lang : I18n.locale.substr(0,2),
          //   platform: Platform.OS,
          // })
        } else {
          await firebase.messaging().requestPermission()
          let newToken = await firebase.messaging().getToken()
          this.props.saveToken({
            accountId: this.props.user.accountId,
            token: newToken,
            lang: I18n.locale.substr(0, 2),
            platform: Platform.OS,
          })
        }
      } catch (error) {

      }
    } else {
      this.props.fetchPublicFeed(0, 10)
    }
  }

  _navigateMention = (type, object) => {
    if (type === 'wine') {
      this.props.navigator.push({
        screen: SCREEN_IDS.WINE,
        title: object.name,
        passProps: {
          id: object.id,
          wine: object,
        }
      })
    }

    if (type === 'winery') {
      this.props.navigator.showModal({
        screen: SCREEN_IDS.WINERY,
        title: object.name,
        passProps: {
          id: object.id,
        },
      })
    }
  }

  _navigateArticle = (id) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.ARTICLE,
      backButtonHidden: true,
      navigatorStyle: {
        navBarButtonColor: 'blue',
      },
      passProps: {
        id,
      }
    })
  }

  _onLikeArticle = (id, like) => {
    this.props.setLike(id, this.props.user.accountId, like)
  }

  _navigateProfile = (profile) => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.USER,
      passProps: {
        id: profile.id,
      }
    })
  }

  _onFollow = (id) => {
    this.props.setFollower(id, false)
  }

  _renderItem = ({ item, index }) => {
    switch (item.action) {
      case 'NEWS': return (
        item.target &&
        <ArticleCard
          key={`${index}-${item.target.id}`}
          article={item.target}
          user={item.user}
          onPress={() => { this._navigateArticle(item.target.id) }}
          onLike={this._onLikeArticle}
        />
      )
      case 'RATE': return <RateCard object={item} onPress={this._navigateMention} />
      case 'COMMENT': return <View />
      default:
        return <View />
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    }, () => {
      if (this.state.canGoBack) {
        this.props.navigator.setTitle({
          title: ''
        })
        this.props.setNavButtons({
          leftButtons: [{
            icon: 'vback',
            type: 'custom',
            id: 'goBack',
          }],
          rightButtons: []
        })
        this.props.navigator.setOnNavigatorEvent(this._goBack)
      } else {
        if (this.props.token) {
          this.props.navigator.setTitle({
            title: 'Blog'
          })
          this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent)
          this.props.setNavButtons({
            leftButtons: [{
              id: 'home',
              icon: VINO_APP_LOGO
            }],
            rightButtons: this.state.webViewLoaded ? [{
                id: 'settings',
                icon: settingImg
            }] : []
          })
        } else {
          this.props.navigator.setTitle({
            title: 'Blog'
          })
          this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent)
          this.props.setNavButtons({
            leftButtons: [{
              id: 'home',
              icon: VINO_APP_LOGO
            }]
          })
        }
      }
    });
  }

   _onNavigatorEvent = (event) => {
    if (event.id === 'settings') {
      this.props.navigator.push({
        screen: SCREEN_IDS.ACCOUNT_SETTINGS,
      })
    }
  }

  _goBack = (event) => {
    if (event.id === 'goBack') {
      return this.WEBVIEW_REF.goBack();
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.webViewLoaded ? null :
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
              isVisible={true}
              size={30}
              type={'Bounce'}
              color={colors.primaryColor}
            />
            <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
              {I18n.t('loading')}
            </Text>
          </View>
        }
        <WebView
          ref={ref => this.WEBVIEW_REF = ref}
          onLoadEnd={() => this.setState({ webViewLoaded: true })}
          onLoadStart={() => this.setState({ webViewLoaded: false })}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{ uri: 'https://now.vinoapp.co/blog/?device=mob' }}
        />
      </View>
    );
  }

  /* render() {
    const { data, loading, page, } = this.props
 
    if (loading && page == 0) {
      return (
        <View style={{ minHeight: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            isVisible={true}
            size={30}
            type={'Bounce'}
            color={colors.primaryColor}
          />
          <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
            {I18n.t('loading')}
          </Text>
        </View>
      )
    }
 
    _keyExtractor = (object, idx) => {
      if (object.type === 'USER') {
        return object.user
      } else {
        return object.id
      }
    }
 
    return (
      <FlatList
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        contentContainerStyle={{ paddingBottom: 10 }}
        style={{ paddingTop: 10, backgroundColor: '#F6F6F6' }}
        ListFooterComponent={() => (
          loading ?
            <View style={{ minHeight: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                isVisible={true}
                size={30}
                type={'Bounce'}
                color={colors.primaryColor}
              />
            </View> : null
        )}
        onEndReached={() => { }}
        onEndReachedThreshold={0.2}
      />
    )
  } */
}

export default Screen(FeedView, {
  title: 'menu.blog',
  navigatorStyle: NavStyles.tab,
})
