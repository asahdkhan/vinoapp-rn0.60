import { colors, } from 'theme'
import { Platform } from 'react-native'

/**
 * Styles for profile view
 */
export default {

  viewContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  headerContainer: {
    height: 100,
    backgroundColor: colors.primaryColor,
    paddingTop: 5,
  },

  profileInfo: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flex: 1,
    paddingTop: 0,
  },

  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderColor: '#FFF',
    borderWidth: 2,
    backgroundColor: '#FFF',
    marginRight: 22,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  usernameContainer: {
    flexDirection: 'column',
    paddingTop: 22,
  },

  username: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Raleway-Regular',
  },

  location: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Raleway-Regular',
    //marginTop: 1,
  },

  countersButton: { 
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterButtonCenter: {
    borderRightColor: '#34A06A',
    borderLeftColor: '#34A06A',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  counterValue: {
    fontSize: 17,
    color: '#FFF',
    fontFamily: 'Raleway-Regular',
  },
  
  counterLabel: {
    fontSize: 8,
    color: '#FFF',
    fontFamily: 'Raleway-Regular',
    marginTop: -2,
  },

  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5, 
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  tab: {
    marginLeft:10,
    marginRight:10,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },

  tabLabel: {
    color: '#34404C',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    marginBottom: -2,
    textAlign: 'center',
  },

  tabActive: {
    borderBottomColor: colors.primaryColor,
  },

  tabActiveLabel: {
    color: colors.primaryColor,
  },

  badgeCard: {
    //borderWidth: 3,
    //borderColor: colors.primaryColor,
    margin: 3,
    marginBottom: 10,
    backgroundColor: '#FFF',
    flex: 1,
  },

  cardBody: {
    flex: 1,
    paddingRight: 15,
    //paddingLeft: 20,
    paddingTop: 15,
    paddingLeft: 75,
  },

  badgeCardBody: {
    paddingLeft:20,
    position: 'relative',
    flexDirection: 'row',
    paddingBottom: 20
  },
}
