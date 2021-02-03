/**
 * Styles for CommentBox
 */
export default {
  viewContainer: {
    backgroundColor: '#FFF',
   /*  shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }, */
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    position: 'relative'
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 15,
    //paddingLeft: 20,
    paddingTop: 15,
    paddingLeft: 75,
  },

  avatar: {
    position: 'absolute',
    left: 10,
    top: 15,
    width: 50,
    height: 50,
    backgroundColor: '#CCC',
    borderRadius: 50,
   // marginRight: 10,
    overflow: 'hidden'
  },

  comment: {
    paddingBottom: 10,
    flexWrap: 'wrap'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  user: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    color: '#34404c',
  },

  date: {
    fontFamily: 'Raleway-Bold',
    fontSize: 10.5,
    color: '#34404c'
  },

  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  rateText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    marginRight: 10
  },

  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    //lineHeight: 15,
    flex: 1
  },

  actions: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#dadada',
    borderBottomColor: '#dadada',
    paddingVertical: 10,
    height: 50,
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
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c',
    marginLeft: 9
  },
}