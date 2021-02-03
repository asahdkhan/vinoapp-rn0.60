import { Platform } from 'react-native'

/**
 * Styles for ArticleView
 */
export default {
  viewContainer: {
    backgroundColor: '#f6f6f6',
  },

  header: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 70 : 82
  },

  coverContainer: {
    flexDirection: 'row',
    height: 250,
    backgroundColor: '#e2e2e2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },

  btnClose: {
    backgroundColor: 'transparent',
    marginTop: 15,
    marginLeft: 10,
    width: 40,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  defaultCover: {
    alignSelf: 'center',
  },

  cover: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "stretch",
    alignItems: "stretch",
    width: null,
    height: null,
  },

  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Raleway-Regular',
    fontSize: 24,
    color: '#34404c',
    marginBottom: 15
  },

  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    //lineHeight: 15,
    marginBottom: 15
  },

  content: {
    paddingHorizontal: 18,
    marginTop: 20,  
    backgroundColor: '#f6f6f6',
    zIndex: 100,
  },

  actions: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 0.5,
    borderTopColor: '#dadada',
  },

  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12.5,
    paddingRight: 12.5
  },

  actionsButtonText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 11.5,
    color: '#34404c',
    marginLeft: 7.7
  },

  commentsContainer: {
    marginTop: 10,
  },

  commentsBoxTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16.5,
    color: '#34404c',
    marginHorizontal: 18,
    marginBottom: 6
  },

  commentAction: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },

  commentActionText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    marginLeft: 10,
    textDecorationLine: 'underline'
  },
}
