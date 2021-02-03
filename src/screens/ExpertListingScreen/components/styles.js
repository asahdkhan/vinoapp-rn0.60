import React from "react";
import {
  StyleSheet,
} from "react-native";
import { colors } from 'theme'


export const styles = StyleSheet.create({

  scrollviewContainer: {
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
   // flexWrap: 'wrap'
  },
  selectExpertView: {
    paddingBottom: 10,
    width: '100%',
  },
  selectExpertText:
  {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    color: '#ee4036',
  },
  rowExpertInfo: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  profileImg: {
    alignItems: 'center',
    position: 'relative',
    margin: 5
  },
  profileDesc: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  profileName: {
    color: '#34404c',
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    textAlign: 'left',
  },
  profileInfo: {
    color: "#34404c",
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    textAlign: 'left',
  },
  expertListingArrow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingRight: 10,
    justifyContent: 'flex-end',
  },


  expertImageContainer: {
    width: 80,
    height: 80,
    borderColor: '#FFF',
    borderWidth: 2,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderRadius: 40,
  },

  ExpertprofileName: {
    color: "#de0101",
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden',
    position: 'absolute',
    top: 230,
  },
  expertHintText: {
    color: "#de0101",
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 5,
    paddingTop: 15
  },
  expertDesc: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 5

  },

  expertInfo: {
    color: "#000",
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'left',
    padding: 5
  },
});
