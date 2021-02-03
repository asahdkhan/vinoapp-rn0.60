/**
 * Styles for pairings view
 */
export default {
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  
  title: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#4a4a4a',
    textAlign: 'center'
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },

  filtersContainer: { 
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
  },

  filterValue: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    marginLeft: 2,
    marginRight: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  filterText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    lineHeight: 50,
    color: '#4a4a4a',
    textAlign: 'center',
    justifyContent: 'space-between'
  },

  pairingsCount: {
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'GothamRounded-Book',
    marginBottom: 15,
    marginTop: 24,
    textAlign: 'center',
  },

  videosContainer: {
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
}
