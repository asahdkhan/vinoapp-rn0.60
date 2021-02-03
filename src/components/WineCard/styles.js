import { colors } from 'theme'
import { Dimensions } from 'react-native'

var deviceWidth = Dimensions.get('window').width

/**
 * Styles for wine card
 */
export default {
  card: {
    minHeight: 130,
    backgroundColor: '#FFF',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  info: {
    flex:1, 
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 8,
    paddingRight: 8,
  },


  winePicture: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  }, 

  content: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  extra: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(206,206,206,0.6)',
    height: 35
  },

  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },

  title: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    marginTop: 18,
    marginBottom: 18,
    textAlign: 'center'
  },

  box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 6,
    paddingRight: 20,
    marginBottom: 0.5
  },

  wineryName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    marginTop: 0,
    marginBottom: 4
  },

  wineName: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#34404c',
    marginBottom: 4
  },

  varieties: {
    marginBottom: 4,
    fontFamily: 'Raleway-Bold',
    fontSize: 10,
    //color: '#999999',
    color: '#34404c',
  },

  infoTxt: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    //color: '#333333',
    color: '#999999',
    //lineHeight: 15,
  },

  bolderInfo: {
    fontFamily: 'Raleway-Regular',
  },

  userSuggestionBadge: {
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5
  },

  userSuggestionLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    textAlign: 'center'
  },

  averageContainer: {
    width: deviceWidth * 0.22,
    height: deviceWidth * 0.22,
    padding:10,
    borderWidth: 1.5,
    borderRadius: deviceWidth * 0.11,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  averageValue: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: deviceWidth * 0.11,
    textAlign: 'center',
  },

  averageLabel: {
    fontFamily: 'Raleway-Bold',
    fontSize: 8,
    color: '#34404c',
    textAlign: 'center',
  }
}