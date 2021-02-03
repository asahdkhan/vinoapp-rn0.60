/**
 * Styles for SpecialSearchView
 */
import { colors } from 'theme'

export default {
  viewContainer: {
    flex: 1,
    //paddingBottom: 20,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column'
  },

  helpBox: {
    padding: 20,
    //margin: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  helpTxt: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#34404c', 
  },

  filterContainer: {
    marginTop: 15,
    flex: 1
  },

  filterTitle: {
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#34404c', 
  },

  card: {
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,  
      width: 0
    },
  },

  searchBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 17,
    paddingRight: 25 + '%',
    height: 48,
    paddingLeft: 25 + '%',
    borderRadius: 30,
    backgroundColor: colors.primaryColor,
  },

  btnLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 22,
    color: '#fff'
  },

  rangeLabel: {
    fontFamily: 'Raleway-Regular',
    color: '#000'
  },

}
