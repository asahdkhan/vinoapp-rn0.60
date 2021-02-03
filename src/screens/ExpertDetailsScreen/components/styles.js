import React from "react";
import {
  StyleSheet,
} from "react-native";

import { colors } from 'theme'

export const styles = StyleSheet.create({

  scrollviewContainer: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    paddingBottom: 30
  },
  expertDetailsBackground: {
    flexDirection: 'column',
    backgroundColor: colors.primaryColor,
    height: 320,
    alignItems: 'center',

  },
  expertImageBackgroundContainer: {
    width: '100%',
    height: 160,
    overflow: 'hidden',
  },
  expertImageContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    borderColor: '#FFF',
    borderWidth: 3,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    position: 'absolute',
    top: 55
  },
  expertprofileName: {
    color: "#fff",
    fontFamily: 'Raleway-Bold',
    fontSize: 21,
    textAlign: 'left',
    overflow: 'hidden',
    position: 'absolute',
    top: 210,
  },
  aboutExpertViewContainer: {
    marginTop: -70,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  expertShortInfoContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  verticalLine: {
    borderLeftWidth: 2,
    borderLeftColor: 'black',
  },

  horizontalLine: {
    paddingTop: 20,
    borderBottomColor: '#34404c',
    borderBottomWidth: 1,
  },

  expertText: {
    color: "#1a1a1a",
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    textAlign: 'left',
    overflow: 'hidden',
  },

  expertAgeAndCityText: {
    color: "#34404c",
    fontFamily: 'Raleway-Bold',
    fontSize: 12,
    textAlign: 'left',
    overflow: 'hidden',
  },

  expertMoreInfoText: {
    paddingTop: 10,
    color: "#34404c",
    lineHeight: 20,
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden',
  },
  socialLinksContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  socialLinksButton: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 40,
  },
});
