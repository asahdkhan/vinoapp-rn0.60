import { init, } from 'services/utils/redux-acron'
import authModule from './AuthModule'
import userModule from './UserModule'
import locationModule from './LocationsModule'
import pairingsModule from './PairingsModule'
import feedModule from './FeedModule'
import searchModule from './SearchModule'
import wineModule from './WineModule'
import vintageModule from './VintageModule'
import wineryModule from './WineryModule'
import articleModule from './ArticleModule'
import appUsersModule from './AppUsersModule'
import i18nModule from './I18nModule'
import wineMakersModule from './WineMakerModule'
import zonesModule from './ZonesModule'
import notificationsModule from './NotificationsModule'

export default init([
  authModule,
  userModule,
  locationModule,
  feedModule,
  pairingsModule,
  searchModule,
  wineModule,
  wineryModule,
  vintageModule,
  articleModule,
  appUsersModule,
  wineMakersModule,
  i18nModule,
  zonesModule,
  notificationsModule,
])
