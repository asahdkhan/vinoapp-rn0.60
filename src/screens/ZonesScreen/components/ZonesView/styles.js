export default {
  header: {
    height: 150,
    backgroundColor: '#000',
  },

  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 32,
    fontFamily: 'Raleway-Regular',
    color: '#FFF',
    textAlign: 'center',
  },

  item : {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 15,
    paddingRight: 10,
    marginRight: 5,
    marginBottom: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 2,
  },

  itemLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    color: '#34404c',
    flex: 1,
    //lineHeight: 18
  }
}