/**
 * Styles for RateModal
 */
export default {
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
  },

  modalInner: { 
    margin: 15, 
    backgroundColor: '#FFF', 
    paddingTop: 25 ,
    marginTop: -170,
    borderRadius: 4,
    height: 239,
  },

  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
  },

  commentBox: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    margin: 10,
    minHeight: 80,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 30,
    borderRadius: 4,
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
    fontFamily: 'GothamRounded-Medium',
    color: '#666',
    //lineHeight: 18 
  },

  rateContainer: {
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}