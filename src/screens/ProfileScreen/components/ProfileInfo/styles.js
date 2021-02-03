/**
 * Styles for ProfileInfo
 */
export default {
  box: {
    flex: 1,
    height: 185,
    paddingTop: 18.5,
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    marginHorizontal: 3,
    elevation: 2,
  },

  bigBox: {
    marginTop: 6,
    paddingLeft: 13,
    paddingRight: 13,
    marginBottom: 30,
    height: 230,
  },

  boxTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 10,
  },

  genericText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 12,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  row: { flexDirection: 'row', paddingHorizontal: 3 },
  
  pieContainer: { justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: -10, },
  raitingButton: { height: 60, justifyContent: 'center', borderTopWidth: 0.5, borderTopColor: '#dadada'},
  raitingWineryName: { flex: 1, color: '#4a4a4a', fontFamily: 'GothamRounded-Medium', fontSize: 12 },
  raitingWineName: {  color: '#34a06a', fontFamily: 'GothamRounded-Medium', fontSize: 15},

}