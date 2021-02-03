import { colors, } from 'theme'

export default {
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
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
    marginBottom: 15,
  },

  cardBody: {
    flex: 1,
   // paddingRight: 15,
   //paddingLeft: 20,
    paddingTop: 15,
  // paddingLeft: 75,
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

 /*  user: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14.5,
    color: '#000',
    flex: 1,
    paddingRight: 10
  }, */

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },

  date: {
    paddingRight: 20,
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: colors.primaryColor
    },

  postTitle: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 10,
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    color: '#34404c', 
    //color: '#414b57', 
    marginBottom: 5
  },

  text: {
    paddingLeft: 22,
    paddingRight: 22,
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
   // color: '#414b57',
    lineHeight: 24,
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
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12.5,
    paddingRight: 12.5,
  },

  actionsButtonText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#34404c',
    marginLeft: 7.7
  },

  /* wineryName: {
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
  }, */

  picturePlaceholder: {
    backgroundColor: '#e2e2e2',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },

  articleImage: {
    backgroundColor: '#e2e2e2',
    width: null,
    height: null,
    alignItems: 'stretch',
    justifyContent: "flex-start",
    flex: 1,
  },
}