import { colors } from 'theme'

/**
 * Styles for WineVintagesList
 */
export default {
  vintagesContainer: {
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

  vintagesTitle: {
    fontFamily: 'Raleway-Regular',
    marginLeft: 15,
    fontSize: 16.5,
    color: colors.primaryColor,
    marginBottom: 12
  },

  vintageCard: {
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 7
  },

  vintageName: {
    flex: 1,
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#34404c'
  },
}
