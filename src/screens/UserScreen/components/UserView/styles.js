/**
 * Styles for UserView
 */
export default {
  card: {
    flex: 1,
    paddingTop: 18.5,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 9,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  infoTitle: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14.5,
    color: '#000',
    marginBottom: 8
  },

  infoText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 12.5,
    color: '#9b9b9b'
  },

  viewContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  headerContainer: {
    height: 210,
    backgroundColor: '#34A06A',
    paddingTop: 70,
  },

  profileInfo: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flex: 1,
    paddingTop: 0,
  },

  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 56,
    borderColor: '#FFF',
    borderWidth: 2,
    backgroundColor: '#FFF',
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  usernameContainer: {
    flexDirection: 'column',
    paddingTop: 5,
  },

  username: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'GothamRounded-Medium',
  },

  location: {
    fontSize: 12,
    color: '#FFF',
     fontFamily: 'GothamRounded-Book',
    marginTop: 2,
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
    fontFamily: 'GothamRounded-Book'
  },
  
  counterLabel: {
    fontSize: 8,
    color: '#FFF',
     fontFamily: 'GothamRounded-Book',
    marginTop: -2,
  },

  followButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  followText: {
    color: '#34A06A',
    fontFamily: 'GothamRounded-Book',
    marginTop: 2,
  },
}
