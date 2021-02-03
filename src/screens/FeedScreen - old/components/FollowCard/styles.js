import { colors } from 'theme'

/**
 * Styles for FollowCard
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

  viewContainer: {
    flexDirection: 'row',
    minHeight: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  avatar: {
    width: 40, 
    height: 40,
    backgroundColor: '#CCC',
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // infoContainer: {
  //   marginLeft: 12.5,
  //   flex: 1,
  //   justifyContent: 'center',
  // },

  userName: {
    fontSize: 15,
    fontFamily: 'GothamRounded-Medium',
    color: colors.secondaryColor,
  },

  secondaryText: {
    fontSize: 13,
    fontFamily: 'GothamRounded-Book',
    color: '#9b9b9b'
  },

  // extraInfoContainer: {
  //   padding: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderLeftWidth: 0.5,
  //   borderLeftColor: '#CFCFCF',
  // },

  // btnFollow: {
  //   //marginBottom: 10,
  //   backgroundColor: '#FFF',
  //   paddingHorizontal: 6,
  //   paddingVertical: 3 ,
  //   borderRadius: 12,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   //marginRight: 12
  // },

  // btnFollowText: { 
  //   fontFamily: 'GothamRounded-Medium',
  //   color: '#34a06a',
  //   marginTop: 0,
  //   fontSize: 12
  // },

  // btnFollowLoading: {
  //   opacity: 1
  // }
}
