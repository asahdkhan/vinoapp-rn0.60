import { utils, colors } from 'theme'

/**
 * Styles for AdvancedSearchView
 */
export default {
  filterContainer: {
    //marginTop: 20,
  },

  filterTitle: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },

  card: {
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    paddingTop: 18,
    paddingBottom: 18,
    marginLeft: 5,
    marginRight: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  addTag: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: colors.primaryColor,
    textDecorationLine: 'underline',
  },

  locationHeader: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#34404c',
    width: '50.00%',
    textAlign: 'center',
    paddingHorizontal: 8
  }
}
