/**
 * Styles for NotificationItem
 */
export default {
  box : {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  avatar: {
    backgroundColor: '#ebebeb',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  title: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#999'
  },

  titleActive: {
    color: '#6d1d61'
  },

  info: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    color: '#9b9b9b'
  },

  date: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 10.5,
    color: '#9b9b9b',
  }
}