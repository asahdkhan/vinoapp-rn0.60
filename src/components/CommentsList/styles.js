/**
 * Styles for CommentList
 */
import { colors } from 'theme'

export default {
  commentBoxContainer: {
    marginTop: 20,
    paddingTop: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  },

  commentsBoxTitle: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    color: colors.primaryColor,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 20
  },

  commentAction: {
    height: 24,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
    marginLeft: 5,
    marginRight: 5,
  },

  commentActionText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    marginLeft: 9,
    textDecorationLine: 'underline'
  },

  commentsContainer: {
    backgroundColor: '#FFF'
  }
}
