/**
 * Styles for UserCard
 */
export default {
  viewContainer: {
    flexDirection: 'row',
    minHeight: 65,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
    alignItems: 'center'
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  avatar: {
    height:50, 
    width: 50, 
  },

  infoContainer: {
    marginLeft: 12.5,
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between'
  },

  userName: {
    fontSize: 15,
    fontFamily: 'GothamRounded-Book',
    color: '#000'
  },

  secondaryText: {
    fontSize: 13,
    fontFamily: 'GothamRounded-Book',
    color: '#9b9b9b'
  },

  extraInfoContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between'
  }
}
