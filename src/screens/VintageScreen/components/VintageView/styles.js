import { Platform, Dimensions } from "react-native";
import { colors } from "theme";

var deviceWidth = Dimensions.get("window").width;

/**
 * Styles for VintageView
 */
export default {
  viewContainer: {
    flex: 1,
  },

  card: {
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  infoCard: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  wineClubButton: {
    backgroundColor: colors.primaryColor,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    borderRadius: 24,
  },

  wineClubButtonLabel: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: 'Raleway-Regular',
      color: '#FFF',
      ...Platform.select({
        ios: {
          marginTop: 4
        }
      })
  },

  averageContainer: {
    width: deviceWidth * 0.28,
    height: deviceWidth * 0.28,
    padding: 8,
    borderWidth: 2.0,
    borderRadius: deviceWidth * 0.14,
    borderColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },

  averageValue: {
    fontFamily: "Raleway-Regular",
    color: "#34404c",
    fontSize: deviceWidth * 0.14,
    textAlign: "center",
  },

  averageLabel: {
    fontFamily: "Raleway-Bold",
    fontSize: 10,
    color: "#34404c",
    textAlign: "center",
  },

  relatedAverageContainer: {
    width: deviceWidth * 0.16,
    height: deviceWidth * 0.16,
    padding: 5,
    borderWidth: 2.0,
    borderRadius: deviceWidth * 0.8,
    borderColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },

  zonesIcon: {
    width: 38,
    height: 38,
  },

  wineClubIcon: {
    width: 32,
    height: 32,
  },

  zonesView: {
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },

  relatedAverageValue: {
    fontFamily: "Raleway-Regular",
    color: "#34404c",
    fontSize: deviceWidth * 0.08,
    //fontSize: 8,
    textAlign: "center",
  },

  generalInfoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: 'center',
    //paddingLeft: 15,
    //paddingRight: 10,
  },

  generalInfo: {
    marginLeft: 25,
    paddingRight: 10,
    flex: 1,
  },

  generalInfoTitle: {
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    fontSize: 16.5,
    marginBottom: 10,
  },

  generalInfoItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },

  infoLabel: {
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    fontSize: 12,
    width: 75,
  },

  infoValue: {
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    fontSize: 12,
    color: "#34404c",
    flex: 1,
    flexDirection: "column",
  },

  infoSubValue: {
    flex: 1,
  },

  badgesContainer: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#979797",
    height: 55,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 0,
  },

  actions: {
    flexDirection: "row",
    //height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 80,
    marginRight: 80,
  },

  actionsButton: {
    width: 100 + "%",
    height: 40,
    marginTop: 20,
    // marginBottom: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  actionsButtonIcon: {},

  actionsButtonText: {
    fontFamily: "Raleway-Regular",
    fontSize: 12,
    color: "#fff",
    marginLeft: 8,
  },

  score: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  scorePoints: {
    alignItems: "center",
  },

  points: {
    fontFamily: "GothamRounded-Book",
    fontSize: 39,
    color: "#4a4a4a",
  },

  reviewsCount: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 10.5,
    color: "#4a4a4a",
    marginTop: -5,
  },

  raitingBar: {
    marginLeft: 25,
    height: 30,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        marginTop: -30,
      },
      android: {
        marginTop: -10,
      },
    }),
  },

  rateContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: 180,
    alignItems: "stretch",
  },

  rate: {
    backgroundColor: colors.primaryColor,
    width: 130,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 5,
  },

  rateLabel: {
    fontFamily: "Raleway-Regular",
    fontSize: 9,
    color: "#FFF",
  },

  rateValue: {
    fontFamily: "Raleway-Regular",
    fontSize: 64,
    color: "#FFF",
    marginTop: 10,
  },

  rateString: {
    fontFamily: "Raleway-Regular",
    fontSize: 15.5,
    color: "#FFF",
    marginTop: 10,
  },

  notes: {
    paddingLeft: 40,
    paddingRight: 15,
    flex: 0,
  },

  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  notePoint: {
    width: 14,
    height: 14,
    borderRadius: 14,
    marginRight: 10.5,
  },

  noteName: {
    fontFamily: "Raleway-Regular",
    fontSize: 14,
    color: "#34404c",
  },

  intensityWheelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: 40
  },

  mainAromas: {
    minHeight: 85,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },

  fieldsTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    //paddingBottom: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  fieldsValue: {
    flex: 1.5,
    fontSize: 16.5,
    fontFamily: "Raleway-Regular",
    color: "#34404c",
    marginBottom: 5,
    marginTop: 10,
    //paddingLeft: 20,
    paddingRight: 10,
  },

  locationColumn: {
    flex: 1,
    //width: deviceWidth * 0.32,
    flexDirection: "column",
    paddingHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  aromasList: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#34404c",
    /* borderTopWidth: 0.5,
    borderTopColor: '#34404c', */
    //alignItems: 'center',
    minHeight: 50,
    marginBottom: 10,
    flexDirection: "row",
  },

  vintagesContainer: {
    marginTop: 18,
    marginLeft: 16.5,
    marginRight: 16.5,
  },

  vintagesTitle: {
    fontFamily: "Raleway-Regular",
    fontSize: 16.5,
    color: colors.primaryColor,
    marginBottom: 12,
  },

  vintageCard: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 7,
  },

  vintageName: {
    flex: 1,
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    color: "#4a4a4a",
  },

  infoContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },

  infoRow: {
    paddingTop: 5,
    flexDirection: "row",
  },

  infoCol: {
    flex: 1,
  },

  infoItem: {
    flexDirection: "row",
    marginBottom: 14,
  },

  wineMakersContainer: {
    backgroundColor: "#fffcf4",
    padding: 15,
    marginTop: 10,
  },

  wineMakerTitle: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 16.5,
    paddingLeft: 0.5,
    color: colors.secondaryColor,
    marginBottom: 12,
  },

  pairingsContainer: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 34,
  },

  pairingsTitle: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 16.5,
    color: colors.secondaryColor,
    paddingLeft: 15.5,
    marginBottom: 12,
  },

  //Comments

  commentsBoxTitle: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 16.5,
    color: "#4a4a4a",
    marginLeft: 15.5,
    marginBottom: 12,
  },

  commentAction: {
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  commentActionText: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 12,
    color: "#4a4a4a",
    marginLeft: 10,
    textDecorationLine: "underline",
  },

  relatedWinesContainer: {
    backgroundColor: "#FFF",
    padding: 24,
  },

  relatedWinesTitle: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 17,
    color: colors.secondaryColor,
    textAlign: "center",
    marginBottom: 20,
  },

  commentBoxContainer: {
    marginTop: 20,
  },

  titleIcon: {
    marginRight: 5,
    flex: 1,
    width: 25,
    height: 20,
  },

  intensityWheelTitleContainer: {
    marginBottom: 0,
    paddingTop: 0,
    position: "relative",
    minHeight: 25,
  },

  intensityWheelTitle: {
    fontSize: 16.5,
    paddingLeft: 10,
    paddingBottom: 10,
    fontFamily: "Raleway-Regular",
    color: colors.primaryColor,
    flex: 1,
  },

  bottomBar: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#34404c",
    paddingBottom: 10,
  },

  valueContainer: {
    //position: 'absolute',
    // top: 35,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      {
        translateX: -18,
      },
    ],
  },

  valueText: {
    fontFamily: "Raleway-Regular",
    color: "#FFF",
    fontSize: 10,
  },

  valueContainerActive: {
    top: -8,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#34404c",
    transform: [
      {
        translateX: -18,
      },
    ],
  },

  valueTextActive: {
    fontSize: 10,
    color: "#FFF",
    marginTop: 0,
    fontWeight: "200",
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#34404c",
    position: "absolute",
    bottom: -6,
    left: 6,
    transform: [{ rotate: "180deg" }],
  },
};
