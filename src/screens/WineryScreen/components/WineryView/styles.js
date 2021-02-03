import { Dimensions } from 'react-native'
import { colors } from 'theme'

var deviceWidth = Dimensions.get('window').width;
/**
 * Styles for WineryView
 */
export default {
  viewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  header: {
    position: 'relative',
    height: 180,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 180,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    backgroundColor: '#F5F5F5'
  },

  avatar: {
    width: 116,
    height: 116,
    backgroundColor: '#F5F5F5',
    borderRadius: 116,
    marginBottom: -58,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  avatarImage: {
    borderRadius: 58,
    width: 116,
    height: 116,
  },

  info: {
    marginTop: 68,
    paddingLeft: 10,
    paddingRight: 10
  },

  infoPrimary: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16.5,
    color: '#34404c',
    textAlign: 'center'
  },

  infoSecondary: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13.5,
    color: '#34404c',
    textAlign: 'center'
  },

  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  socialButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reputationContainer: {
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 115
  },

  reputationTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    color: '#000',
  },

  reputationSubtitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#999',
  },

  winesContainer: {
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    paddingTop: 25,
    paddingBottom: 0,
    marginTop: 10
  },

  wineMakersContainer: {
    backgroundColor: '#fffcf4',
    padding: 15,
    marginTop: 10
  },

  wineMakerTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16.5,
    paddingLeft: 0.5,
    color: colors.primaryColor,
    marginBottom: 12
  },

  locationAddress: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13.5,
    color: '#34404c',
    paddingHorizontal: 30,
    textAlign: 'center'
  },

  locationHours: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13.5,
    color: '#34404c',
  },

  relatedAverageContainer: {
    width: deviceWidth * 0.16,
    height: deviceWidth * 0.16,
    padding: 5,
    borderWidth: 2.0,
    borderRadius: deviceWidth * 0.8,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  relatedAverageValue: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: deviceWidth * 0.08,
    //fontSize: 8,
    textAlign: 'center',
  },
}
