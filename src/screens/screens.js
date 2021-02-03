import { Image, Text } from 'react-native'
import { Navigation, } from 'react-native-navigation'
import I18n from 'react-native-i18n'
import RootScreen from 'screens/RootScreen'
import OnboardingScreen from 'screens/OnboardingScreen'
import WelcomeScreen from 'screens/WelcomeScreen'
import WineryAccessScreen from 'screens/WineryAccessScreen'
import LoginScreen from 'screens/LoginScreen'
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen'
import SignupScreen from 'screens/SignupScreen'
import GeoLocationPickerScreen from 'screens/GeoLocationPickerScreen'
import NotificationsScreen from 'screens/NotificationsScreen'

import SearchScreen from 'screens/SearchScreen'
import SearchResultsScreen from 'screens/SearchResultsScreen'
import SpecialSearchScreen from 'screens/SpecialSearchScreen'
import AdvancedSearchScreen from 'screens/AdvancedSearchScreen'
import ListPickerScreen from 'screens/ListPickerScreen'

import ExploreScreen from 'screens/ExploreScreen'
import RegionDetailsScreen from 'screens/RegionDetailsScreen'

import LocationsScreen from 'screens/LocationsScreen'
import ZonesScreen from 'screens/ZonesScreen'
import LocationWinesScreen from 'screens/LocationWinesScreen'

import PairingsScreen from 'screens/PairingsScreen'
import PairingsFilterScreen from 'screens/PairingsFilterScreen'
import PairingDetailScreen from 'screens/PairingDetailScreen'

import ProfileScreen from 'screens/ProfileScreen'
import MyUsersScreen from 'screens/MyUsersScreen'
import AccountSettingsScreen from './AccountSettingsScreen'
import UserScreen from 'screens/UserScreen'
import SearchUsersScreen from 'screens/SearchUsersScreen'

import BlogScreen from 'screens/BlogScreen'
import BlogDetailsScreen from 'screens/BlogDetailsScreen'
import ArticleScreen from 'screens/ArticleScreen'

import WineScreen from 'screens/WineScreen'
import WineryScreen from 'screens/WineryScreen'
import VintageScreen from 'screens/VintageScreen'
import WineMakerScreen from 'screens/WineMakerScreen'

import ExpertListingScreen from 'screens/ExpertListingScreen'
import ExpertDetailsScreen from 'screens/ExpertDetailsScreen'

import NavStyles from 'theme/NavigatorStyles'

import { colors } from 'theme'

const exploreImg = require('images/main/explore.png');
const newsImg = require('images/main/news.png');
const searchImg = require('images/main/search.png');
const locationImg = require('images/main/argentina.png');
const profileImg = require('images/main/profile.png');
//require('images/tabs/news-active.png');

/**
 * Define the ID for each screen
 * (similar to a path)
 */

export const SCREEN_IDS = {
  ROOT: 'vinoapp.root',
  ONBOARDING: 'vinoapp.onboarding',
  WELCOME: 'vinoapp.welcome',
  WINERY_ACCESS: 'vinoapp.winery_access',
  LOGIN: 'vinoapp.login',
  FORGOT_PASSWORD: 'vinoapp.forgot_password',
  SIGNUP: 'vinoapp.signup',
  GEO_LOCATION_PICKER: 'vinoapp.geo_location_picker',
  NOTIFICATIONS: 'vinoapp.notifications',

  SEARCH: 'vinoapp.main.search',
  SEARCH_RESULTS: 'vinoapp.main.search.results',
  SPECIAL_SEARCH: 'vinoapp.main.search.special',
  ADVANCED_SEARCH: 'vinoapp.main.search.advanced',
  LIST_PICKER: 'vinoapp.main.search.list_picker',

  EXPLORE: 'vinoapp.main.explore',
  EXPERT: 'vinoapp.main.expert',
  EXPERT_DETAILS: 'vinoapp.main.expert.details',

  LOCATIONS: 'vinoapp.main.locations',
  REGION_DETAILS: 'vinoapp.main.locations.region_details',
  ZONES: 'vinoapp.main.locations.zones',
  LOCATION_WINES: 'vinoapp.main.locations.wines',

  PAIRINGS: 'vinoapp.main.pairings',
  PAIRINGS_FILTER: 'vinoapp.main.pairings.filters',
  PAIRING_DETAIL: 'vinoapp.main.pairings.detail',

  PROFILE: 'vinoapp.main.profile',
  MY_USERS: 'vinoapp.main.profile.my_users',
  ACCOUNT_SETTINGS: 'vinoapp.main.profile.account_settings',
  USER: 'vinoapp.main.profile.user',
  SEARCH_USERS: 'vinoapp.main.profile.search_users',

  BLOG: 'vinoapp.main.blog',
  BLOG_DETAILS: 'vinoapp.main.blog.details',
  ARTICLE: 'vinoapp.main.feed.article',
  WINE: 'vinoapp.main.wines.detail',
  WINERY: 'vinoapp.main.wineries.detail',
  VINTAGE: 'vinoapp.main.vintages.detail',
  WINE_MAKER: 'vinoapp.main.winemaker.detail',
}

/** ssss
 * Returns an object for the main navigation after root view
 */
export const getNavConfiguration = (icons) => {
  return {
    tabs: [
      {
        label: I18n.t('menu.explore').toUpperCase(),
        screen: SCREEN_IDS.EXPLORE,
        icon: exploreImg
      },
      {
        label: I18n.t('menu.blog').toUpperCase(),
        screen: SCREEN_IDS.BLOG,
        //icon: icons['feed'],
        icon: newsImg,
      },
      {
        label: I18n.t('menu.search').toUpperCase(),
        screen: SCREEN_IDS.SEARCH,
        //icon: icons['search'],
        icon: searchImg
      },
      {
        label: I18n.t('menu.argentina').toUpperCase(),
        screen: SCREEN_IDS.LOCATIONS,
        //icon: icons['location'],
        icon: locationImg
      },
      {
        label: I18n.t('menu.profile').toUpperCase(),
        screen: SCREEN_IDS.PROFILE,
        //icon: icons['location'],
        icon: profileImg
      },
    ],
    animationType: 'fade',
    tabsStyle: NavStyles.tabs,
    appStyle: {
      //orientation: 'portrait',
      bottomTabBadgeTextColor: '#FFF',
      //bottomTabBadgeBackgroundColor: '#00c5ba',
      //tabBarButtonColor: '#9da5b0',
      //tabBarTopPadding: 50,
      tabBarSelectedButtonColor: colors.primaryColor,
      tabFontFamily: 'Raleway-Regular',
      tabBarSelectedLabelColor: colors.primaryColor,
      statusBarTextColorSchemeSingleScreen: 'light',
      screenBackgroundColor: 'white',
      forceTitlesDisplay: true,
      navBarButtonColor: '#FFF',
      //For android 
      ...NavStyles.tabs,
    }
  }
}

/**
 * Register and inject the redux store to all the scenes/screens/parts in the navigator
 * @param {Object} store: Redux Store
 * @param {Object} Provider: Redux Provider
 */
export const registerScreens = (store, Provider) => {
  RootScreen(SCREEN_IDS.ROOT, store, Provider)
  OnboardingScreen(SCREEN_IDS.ONBOARDING, store, Provider)
  WelcomeScreen(SCREEN_IDS.WELCOME, store, Provider)
  WineryAccessScreen(SCREEN_IDS.WINERY_ACCESS, store, Provider)
  LoginScreen(SCREEN_IDS.LOGIN, store, Provider)
  ForgotPasswordScreen(SCREEN_IDS.FORGOT_PASSWORD, store, Provider)
  SignupScreen(SCREEN_IDS.SIGNUP, store, Provider)
  GeoLocationPickerScreen(SCREEN_IDS.GEO_LOCATION_PICKER, store, Provider)
  NotificationsScreen(SCREEN_IDS.NOTIFICATIONS, store, Provider)

  SearchScreen(SCREEN_IDS.SEARCH, store, Provider)
  SearchResultsScreen(SCREEN_IDS.SEARCH_RESULTS, store, Provider)
  SpecialSearchScreen(SCREEN_IDS.SPECIAL_SEARCH, store, Provider)
  AdvancedSearchScreen(SCREEN_IDS.ADVANCED_SEARCH, store, Provider)
  ListPickerScreen(SCREEN_IDS.LIST_PICKER, store, Provider)

  ExploreScreen(SCREEN_IDS.EXPLORE, store, Provider)
  ExpertListingScreen(SCREEN_IDS.EXPERT, store, Provider)
  ExpertDetailsScreen(SCREEN_IDS.EXPERT_DETAILS, store, Provider)

  LocationsScreen(SCREEN_IDS.LOCATIONS, store, Provider)
  RegionDetailsScreen(SCREEN_IDS.REGION_DETAILS, store, Provider)
  ZonesScreen(SCREEN_IDS.ZONES, store, Provider)
  LocationWinesScreen(SCREEN_IDS.LOCATION_WINES, store, Provider)

  PairingsScreen(SCREEN_IDS.PAIRINGS, store, Provider)
  PairingsFilterScreen(SCREEN_IDS.PAIRINGS_FILTER, store, Provider)
  PairingDetailScreen(SCREEN_IDS.PAIRING_DETAIL, store, Provider)

  ProfileScreen(SCREEN_IDS.PROFILE, store, Provider)
  MyUsersScreen(SCREEN_IDS.MY_USERS, store, Provider)
  AccountSettingsScreen(SCREEN_IDS.ACCOUNT_SETTINGS, store, Provider)
  UserScreen(SCREEN_IDS.USER, store, Provider)
  SearchUsersScreen(SCREEN_IDS.SEARCH_USERS, store, Provider)

  BlogScreen(SCREEN_IDS.BLOG, store, Provider)
  BlogDetailsScreen(SCREEN_IDS.BLOG_DETAILS, store, Provider)
  ArticleScreen(SCREEN_IDS.ARTICLE, store, Provider)
  WineScreen(SCREEN_IDS.WINE, store, Provider)
  WineryScreen(SCREEN_IDS.WINERY, store, Provider)
  VintageScreen(SCREEN_IDS.VINTAGE, store, Provider)
  WineMakerScreen(SCREEN_IDS.WINE_MAKER, store, Provider)
}
