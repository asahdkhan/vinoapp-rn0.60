import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  ImageBackground,
} from "react-native";
import _ from "lodash";
import Config from "react-native-config";
import config from "react-native-config";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREEN_IDS } from "screens";
import Screen from "hocs/ScreenHoc";
import { colors } from "theme";
import NavStyles from "theme/NavigatorStyles";

const { height, width } = Dimensions.get("window");

import RaitingBar from "components/RaitingBar";
import VideoBox from "screens/PairingsScreen/components/VideoBox";

const GENERCI_BOTTLE = require("images/generic_bottle.png");

const FB_ACTIVE_STYLE = { backgroundColor: colors.primaryColor };
const TW_ACTIVE_STYLE = { backgroundColor: colors.primaryColor };

import styles from "./styles";

class WineryHome extends React.Component {
  componentDidMount() {
    this.props.getDetail(this.props.id);
    //this.props.dispatch(WineryActionCreator.getWinery(this.props.winery));
    //this.props.dispatch(WineryActionCreator.getWines(this.props.winery));
    //this.props.dispatch(WineryActionCreator.getReputation(this.props.winery));
  }

  _buildWineMakers() {
    let wineMakersEl = this.props.detail.wineMaker
      ? this.props.detail.wineMaker.map((wineMaker) => {
          return (
            <VideoBox
              onPress={() => {
                Actions.wineMaker({
                  wineMaker: wineMaker,
                  wines: this.props.wines,
                  winery: this.props.detail.name,
                });
              }}
              key={"winemaker-" + wineMaker.id}
              thumb={{ uri: wineMaker.thumb }}
              width={width / 2 - 15}
              height={100}
            />
          );
        })
      : [];

    return wineMakersEl;
  }

  _goToVintage = (vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  // _goToWine(wine) {
  //   this.props.navigator.push({
  //     screen: SCREEN_IDS.WINE,
  //     title: wine.name,
  //     passProps: {
  //       id: wine.id,
  //       wine: wine,
  //     },
  //   });
  // }

  // _buildWineList() {
  //   let winesEl = this.props.wines ? this.props.wines.map((wine) => {
  //     return (
  //       <TouchableOpacity style={{ width: 70, flex: 0, height: 147, marginLeft: 15, marginRight: 15, alignItems: 'center' }} key={'wine-' + wine.id} onPress={() => { this._goToWine(wine) }}>
  //         {wine.picture ?
  //           <Image source={{ uri: 'http://api.vinoapp.co/api/images/' + wine.picture }} height={90} width={38} style={{ width: 38, height: 90 }} resizeMode={'contain'} /> :
  //           <Image source={GENERCI_BOTTLE} />
  //         }
  //         <Text style={{ fontSize: 11, color: '#34404c', textAlign: 'center', marginTop: 10 }}>{wine.name}</Text>
  //       </TouchableOpacity>
  //     )
  //   }) : [];

  //   return winesEl;
  // }

  _buildVintagesList() {
    let vintgesEL = this.props.vintages
      ? this.props.vintages.map((vintage) => {
          return (
            <TouchableOpacity
              style={{
                width: 90,
                flex: 0,
                height: 300,
                marginLeft: 15,
                alignItems: "center",
              }}
              key={"wine-"}
              onPress={() => {
                this._goToVintage(vintage);
              }}
            >
              {vintage.frontLabel ? (
                <View
                  style={{
                    width: 90,
                    height: 180,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    resizeMode={"cover"}
                    source={{ uri: config.MEDIA_BASE + vintage.frontLabel }}
                    style={{ height: 180, width: 90 }}
                    height={180}
                    width={90}
                  />
                </View>
              ) : (
                <Image
                  resizeMode={"contain"}
                  source={GENERIC_BOTTLE}
                  style={{ height: 180, width: 90 }}
                  height={180}
                  width={90}
                />
              )}
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 5,
                  fontFamily: "Raleway-Regular",
                  color: "#34404c",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {vintage.year}
              </Text>
              <View style={styles.relatedAverageContainer}>
                <Text style={styles.relatedAverageValue}>{vintage.rate}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      : [];
      return vintgesEL;
  }

  render() {
    const { loadingDetail, detail } = this.props;
    console.tron.log("winery-wine", this.props);

    if (loadingDetail || !detail) {
      return (
        <Text style={{ marginTop: 120, textAlign: "center", color: "#777" }}>
          {I18n.t("loading")}
        </Text>
      );
    }

    return (
      <View style={styles.viewContainer}>
        <ScrollView>
          <View style={styles.header}>
            <ImageBackground
              source={{
                uri: config.MEDIA_BASE + "wineries/" + detail.cover,
              }}
              style={styles.cover}
            />

            <View style={styles.avatar}>
              <Image
                source={{ uri: config.MEDIA_BASE + "wineries/" + detail.logo }}
                width={116}
                height={116}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoPrimary}>{detail.web}</Text>
            <Text style={styles.infoSecondary}>
              {detail.city ? detail.city.name : "-"},
              {detail.state ? detail.state.name : "-"} - ARG
            </Text>
            {/*<Text style={ styles.infoSecondary }>{ detail.email }</Text>*/}
            <Text style={styles.infoSecondary}>{detail.tel}</Text>

            <View style={styles.socials}>
              <TouchableOpacity
                style={[styles.socialButton]}
                onPress={() => {
                  if (detail.facebook) {
                    Linking.openURL(
                      "http://" + detail.facebook
                    ).catch((err) => {});
                  }
                }}
              >
                <Icon
                  name="facebook-square"
                  color={colors.primaryColor}
                  size={28}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton]}
                onPress={() => {
                  if (detail.twitter) {
                    Linking.openURL(
                      "http://twitter.com/" + detail.twitter
                    ).catch((err) => {});
                  }
                }}
              >
                <Icon
                  name="twitter-square"
                  color={colors.primaryColor}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.reputationContainer}>
            <Text style={styles.reputationTitle}>
              {I18n.t("winery.winery_rating")}
            </Text>
            <Text style={styles.reputationSubtitle}>
              ({I18n.t("winery.formed_by")})
            </Text>
            <View style={{ marginTop: 15 }}>
              <RaitingBar raiting={this.props.reputation} size={35} />
            </View>
          </View>

          <View style={styles.winesContainer}>
            <Text
              style={[
                styles.reputationTitle,
                { textAlign: "center", marginBottom: 30 },
              ]}
            >
              {I18n.t("winery.the_vintages")}
            </Text>
            <ScrollView
              horizontal
              style={{ flexDirection: "row", paddingBottom: 25 }}
            >
              {this._buildVintagesList()}
            </ScrollView>
          </View>

          {/* WineMaker */}
          {detail.wineMaker && detail.wineMaker.length > 0 ? (
            <View key="winemaker" style={styles.wineMakersContainer}>
              <Text style={styles.wineMakerTitle}>
                {I18n.t("winery.winemakers_voice")}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this._buildWineMakers()}
              </View>
            </View>
          ) : null}

          {/* Location Map */}
          {detail.geoAddress &&
          detail.geoAddress.lat &&
          detail.geoAddress.lng ? (
            <View style={{ position: "relative", marginTop: 10 }}>
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?markers=${detail.geoAddress.lat},${detail.geoAddress.lng}&zoom=15&size=500x350&maptype=roadmap&key=${Config.GOOGLE_MAPS_API_KEY}`,
                }}
                style={{ width: "100%", height: 350 }}
              />
              {/*<MapView
                style={{height: 360 }}
                region={{
                    latitude: Number(detail.geoAddress.lat),
                    longitude: Number(detail.geoAddress.lng),
                    latitudeDelta: 0.001922,
                    longitudeDelta:  0.001421
                }}
                onRegionChange={this.onRegionChange}>
                  <MapView.Marker
                    coordinate={{
                      latitude: Number(detail.geoAddress.lat),
                      longitude: Number(detail.geoAddress.lng)
                    }}
                    title={detail.name}
                  />
                </MapView>*/}

              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  height: 75,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.locationAddress}>
                  {detail.address} {"\n"} {detail.city.name},{" "}
                  {detail.state.name}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

export default Screen(WineryHome, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
  },
  navigatorButtons: {
    leftButtons: [
      {
        icon: "vback",
        type: "custom",
        id: "close",
      },
    ],
    rightButtons: [],
  },
});
