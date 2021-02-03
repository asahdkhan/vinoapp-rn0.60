/**
 * Styles for MentionCard
 */
export default {
  card: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 6,
    backgroundColor: '#FFF',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  badgeCard: {
    borderWidth: 3,
    borderColor: '#34a06a',
    margin: 3,
    marginBottom: 10
  },

  cardBody: {
    flex: 1,
    paddingRight: 15,
    //paddingLeft: 20,
    paddingTop: 15,
    paddingLeft: 75,
  },

  badgeCardBody: {
    paddingLeft:20,
    position: 'relative',
    flexDirection: 'row',
    paddingBottom: 20
  },

  text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 12.5,
    color: '#9b9b9b',
    //lineHeight: 15,
    flex: 1
  },

  date: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 10.5,
    color: '#9b9b9b'
  },
}
