import { colors, } from 'theme'

/**
 * Styles for Location Select View
 */
export default {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputContainer: {
    flex: 1,
    marginTop: 25,
  },

  inputTitleText: {
    color: '#4444',
    fontSize: 13,
    marginBottom: 8,
    marginHorizontal: 15
  },

  locationTitle: {
    //position: 'absolute',
    //top: 50,
    //marginVertical: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor: '#F2F2F2',
    fontSize: 16,
    fontWeight: 'bold'
  },

  locationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#F2F2F2'
  },

  locationItemIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 16,
    overflow: 'hidden',
  },

  locationTextMain: {
    fontSize: 16,
  },

  locationTextSecondary: {
    fontSize: 13,
    color: '#444',
  },

  input: {
    flex: 5,
    textAlign: 'auto',
    alignItems: 'center',
    //fontSize: 18 / utils.fontScale,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    color: '#34404c',
    fontFamily: 'Raleway-Regular',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },

  searchField: {
    height: 48,
    flexDirection: 'column',
    textAlign: 'auto',
    borderRadius: 24,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  googleAutoComplete: {
    container: {
      flex: 0,
    },

    listView: {
      marginTop: 35,
    },

    textInputContainer: {
      marginTop: 70,
      backgroundColor: 'white',
      borderTopWidth: .5,
      borderBottomWidth: .5,
      borderWidth: .5,
      borderRadius: 10,
      borderColor: '#CFCFCF',
      borderTopColor: '#CFCFCF',
      borderBottomColor: '#CFCFCF',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      marginHorizontal: 15,
      marginVertical  : 10
    },

    textInput: {
      flex: 1,
      textAlign: 'auto',
      alignItems: 'center',
      backgroundColor: '#FFF',
      paddingLeft: 20,
      color: '#34404c',
      fontFamily: 'Raleway-Regular',
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
    },

    row: {
      paddingHorizontal: 15,
      paddingVertical: 0,
      height: 70,
    },

    separator: {
      height: 0,
    },

    poweredContainer: {
      display: 'none'
    },

    loader: {
      display: 'none'
    }
  },

  textInput: {
    flex: 1,
    marginRight: 5
  },

  inputIcon: {
    alignSelf: 'center',
    marginRight: 10
  },
}
