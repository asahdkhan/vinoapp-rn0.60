import { colors, } from 'theme'

export default {
  viewContainer: {
    paddingTop: 110,
    width: '100%', 
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection:'column',
    flex: 1,
    backgroundColor: '#f6f6f6'
  },

  welcomeText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#666666',
    marginTop: 30,
    backgroundColor: 'transparent'
  },

  topView: {
    alignItems: 'center'
  },

  subtitle: { 
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
    color: '#535353',
    backgroundColor: 'transparent',
  },

  bottomView: {
    alignItems: 'stretch',
  },

  buttonFacebook: {
    backgroundColor: '#fff',
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    borderRadius: 50,
  },

  buttonSignUp: {
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    borderRadius: 50,
  },

  buttonTextSignUp: {
    fontFamily: 'Montserrat-Regular',
    color: '#ffffff',
    fontSize: 18,
  },

  buttonFacebookText: {
    color: 'blue',
    lineHeight: 22,
  },

  optionDivider: { 
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    flexDirection:'row' 
  },

  optionText: {
    width:48,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  divider: {
    backgroundColor: '#cfcfcf',
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },

  buttonWinery: {
    backgroundColor: '#FFF',
    height: 60,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF'
  },

  buttonSingup: {
    marginLeft: 30,
    marginRight: 30,
  },

  loginMessage: {
    flexDirection: 'row', 
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center'
  },

  loginText: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: '#666666',
    backgroundColor: 'transparent'
  },

  buttonTextWinery: {
    fontFamily: 'OpenSans-Regular',
    color: '#4a4a4a',
    fontSize: 13,
  }
}