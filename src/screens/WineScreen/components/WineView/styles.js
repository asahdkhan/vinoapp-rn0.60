import { Platform, Dimensions } from 'react-native'
import { colors, } from 'theme'

var deviceWidth = Dimensions.get('window').width

/**
 * Styles for WineView
 */
export default {
  viewContainer: {
    flex: 1,
  },

  card: {
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  sectionTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16.5,
    color: colors.primaryColor,
    marginBottom: 12
  },

  infoCard: {
    paddingTop: 20,
  },

  generalInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
  },

  generalInfo: {
    marginLeft: 25,
    paddingRight: 10,
    flex: 1,
  },

  generalInfoTitle: {
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    fontSize: 16.5,
    marginBottom: 10
  },

  generalInfoItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start'
  },

  infoLabel: {
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    fontSize: 12,
    width: 75
  },

  infoValue: {
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    fontSize: 12,
    color: '#34404c',
    flex: 1,
    flexDirection: 'column',
  },

  infoSubValue: {
    flex: 1
  },

  badgesContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#979797',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 0,
    overflow: 'visible',
  },

  actions: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 80,
    marginRight: 80,
  },

  actionsButton: {
    width: 100 + '%',
    height: 36,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionsButtonIcon: {

  },

  actionsButtonText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#fff',
    marginLeft: 8
  },

  score: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  scorePoints: {
    alignItems: 'center',
  },

  points: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 39,
    color: '#4a4a4a'
  },

  reviewsCount: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 10.5,
    color: '#4a4a4a',
    marginTop: -5
  },

  raitingBar: {
    marginLeft: 25,
    height: 30,
    justifyContent: 'center',
  },

  rateContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 180,
    alignItems: 'stretch',
  },

  rate: {
    backgroundColor: colors.primaryColor,
    width: 130,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5,
  },

  rateLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 9,
    color: '#FFF',
  },

  rateValue: {
    fontFamily: 'Raleway-Regular',
    fontSize: 64,
    color: '#FFF',
    marginTop: 10
  },

  rateString: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15.5,
    color: '#FFF',
    marginTop: 10
  },

  notes: {
    paddingLeft: 20,
    paddingRight: 15,
    flex: 0,
  },

  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  noteName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12.5,
    color: '#34404c',
  },

  notePoint: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 10.5,
  },

  intensityWheelContainer: { 
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 0
  },

  mainAromas: {
    minHeight: 85,
  },

  aromasTitle: {
    fontSize:16.5,
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    marginBottom: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 20
  },

  aromasList: {
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#34404c',
    borderTopWidth: 0.5,
    borderTopColor: '#34404c',
    minHeight: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },

  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },

  infoRow: {
    paddingTop: 5,
    flexDirection: 'row',
  },

  infoCol: {
    flex: 1,
  },

  infoItem: {
    flexDirection: 'row',
    marginBottom: 14
  },

  wineMakersContainer: {
    backgroundColor: '#FFF',
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

  pairingsContainer: {
    padding: 15,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 34,
  },

  pairingsTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16.5,
    color: colors.primaryColor,
    paddingLeft: 15.5,
    marginBottom: 12
  },

  relatedWinesContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 24,
    marginTop: 30,
  },

  relatedWinesTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    color: colors.primaryColor,
    textAlign: 'center',
    marginBottom: 20
  },

  intensityWheelTitleContainer: {
    marginBottom: 0, 
    paddingTop: 0,
    position: 'relative' ,
    minHeight: 25
  },

  intensityWheelTitle: {
    fontSize:16.5, 
    paddingLeft: 10, 
    fontFamily: 'Raleway-Regular', 
    color: colors.primaryColor,
    flex: 1
  }
}
