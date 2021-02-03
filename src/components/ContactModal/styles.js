/**
 * Styles for ContactModal
 */
import { colors } from 'theme'

export default {
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
  },

  modalInnerContent: {
    margin: 15,
    backgroundColor: '#FFF',
    paddingTop: 25,
    borderRadius: 4,
    height: 219,
    marginTop: -100,
  },

  modalTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16.5,
    color: '#34404c',
    marginBottom: 0,
    paddingHorizontal: 25,
  },

  modalText: { 
    fontSize: 14,
    color: '#34404c' 
  },

  formContainer: {
    paddingHorizontal: 25,
  },

  button: {
    height: 40,
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
  },

  cancelBtn: {

  },

  submitBtn: {
    borderLeftWidth: 1,
    borderLeftColor: '#CFCFCF',
  },


  btnTxt: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: 14,
    height: 18,
  },

  btnTextStyle: {
    fontSize: 14,

  },

  input: {
    minHeight: 100,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 8,
    backgroundColor: '#fff',
    color: '#34404c',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    width: 300,
    marginTop: 10
  },
}
