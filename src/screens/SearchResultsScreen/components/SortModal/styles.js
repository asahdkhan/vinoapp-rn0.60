/**
 * Styles for Sortmodal
 */
import { colors } from 'theme'

export default {
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    //height: '100%',
  },

  modalInner: { 
    margin: 15, 
    backgroundColor: '#FFF', 
    paddingTop: 25 ,
    marginTop: -170,
    borderRadius: 4,
    minWidth: 320,
    maxWidth: 420,
    overflow: 'hidden'
  },

  modalTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16.5,
    color: colors.primaryColor,
    marginBottom: 12,
    paddingHorizontal: 15,
  },

  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
  },

  modalText: { 
    fontSize: 14,
    color: '#4a4a4a' 
  },

  row : {
    marginBottom: 10
  },

  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#34404c', 
    marginHorizontal: 15,
    marginBottom: 10
  },

  btn: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#CFCFCF',
    borderLeftWidth: 1,
  },

  btnTxt: { 
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Raleway-Bold',
    color: '#666',
    //lineHeight: 18 
  },

  // actions: {
  //   flexDirection: 'row',
  //   marginTop: 25
  // },
}
