import { colors } from 'theme'

export default {
  viewContainer: {
    paddingTop: 100,
    backgroundColor: '#f6f6f6',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection:'column',
    flex: 1
  },

  welcomeTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    marginLeft: 35,
    marginRight: 35,
    color: colors.primaryColor,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  welcomeText : {
    color: '#666666',
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: 'transparent',
  },

  image: {
    alignSelf: 'center',
    marginTop: -45,
  },

  buttonVinoApp: {
    backgroundColor: colors.primaryColor,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    borderRadius: 50,
    marginTop: 40
  },

  buttonVinoAppText: {
    fontFamily: 'Raleway-Regular',
    color: '#FFF',
    fontSize: 18
  },
}