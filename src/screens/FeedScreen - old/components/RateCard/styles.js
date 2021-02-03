import { colors, } from 'theme'

/**
 * Styles for RateCard
 */
export default {
  card: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 6,
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  badgeCard: {
    borderWidth: 3,
    borderColor: '#34a06a',
    margin: 3,
    marginBottom: 10
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  user: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14.5,
    color: colors.secondaryColor,
    flex: 1,
    paddingRight: 10
  },

  date: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 10.5,
    color: '#9b9b9b'
  },

  postTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#4a4a4a', 
    marginBottom: 5
  },

  text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 12.5,
    color: '#9b9b9b',
    //lineHeight: 15,
    flex: 1
  },

  avatar: {
    position: 'absolute',
    left: 20,
    top: 15,
    width: 40, 
    height: 40,
    backgroundColor: '#CCC',
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },

  actions: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#dadada',
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12.5,
    paddingRight: 12.5
  },

  actionsButtonText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 11.5,
    color: '#9b9b9b',
    marginLeft: 7.7
  },

  wineryName: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 12,
    color: '#4a4a4a',
    marginTop: 0
  },

  wineName: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#6d1d61'
  },

  secondaryText: {
    color: '#000',
    fontFamily: 'GothamRounded-Book'
  }
}
