import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Platform,
  ProgressViewIOS,
  Linking
} from "react-native";
import _ from "lodash";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/Ionicons";
import config from "react-native-config";
import Screen from "hocs/ScreenHoc";
import PieChart from "react-native-pie-chart";
import { SCREEN_IDS } from "screens";
import CommentViewContainer from "components/CommentViewContainer";
import { colors } from "theme";
import NavStyles from "theme/NavigatorStyles";
import Button from "components/Button";
import RaitingBar from "components/RaitingBar";
import VideoBox from "components/VideoBox";
import PersonalityIcon from "components/PersonalityIcon";
import CommentsList from "components/CommentsList";
import IntensityWheel from "components/IntensityWheel";
import MainAromaIcon from "components/MainAromaIcon";
import WineVintages from "components/WineVintagesList";
import Loading from "components/Loading";
import RateModal from "../RateModal";
import RetailerModal from "components/RetailerModal";
import Reactotron from "reactotron-react-native";
import * as Progress from "react-native-progress";

const IMG_PROVINCE = require("images/zones/province.jpg");
const IMG_ZONE = require("images/zones/zone.jpg");
const IMG_SUBZONE = require("images/zones/subzone.jpg");
const IMG_WINECLUB = require("images/wine-club.png");

//import VectorIcons from 'theme/VectorIcons'
import { utils } from "theme";

import { PersonalitiesNames } from "constants/personalities";

//import BadgeIcon from '../../components/badge-icon'

import { VARIETIES_LABELS } from "constants/varieties";
import STATES from "constants/states";

const { height, width } = Dimensions.get("window");

const COLORS = [
  "#34a06a",
  "#f5d445",
  "#6d1d61",
  "#1b73a3",
  "#e90f4c",
  "#d58f5f",
];

const BODY_OPTIONS = {
  es: {
    light: "Ligero",
    medium: "Medio",
    full: "Completo",
  },
  en: {
    light: "Light",
    medium: "Medium",
    full: "Full",
  },
};

const FINISH_OPTIONS = {
  en: {
    short: "Short",
    medium: "Medium",
    long: "Long",
  },
  es: {
    short: "Corto",
    medium: "Medio",
    long: "Largo",
  },
};

const DECANTER_OPTIONS = {
  en: {
    Esencial: "Esencial",
    Ideal: "Ideal",
    "No need": "No need",
  },

  es: {
    Esencial: "Necesario",
    Ideal: "Idealmente",
    "No need": "No hace falta",
  },
};

const IC_ANALYSIS = require("images/ic-analysis.png");
const IC_PRODUCTION = require("images/ic-production.png");
const TASTING_NOTE_IMG = require("images/group8.png");
const GENERIC_BOTTLE = require("images/generic_bottle.png");

import styles from "./styles";

class VintageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
      openModal: false,
      commentActive: false,
      rateModalOpen: false,
      retailerModalOpen: false,
      temporalRate: 0,
    };
    const buttons = {
      leftButtons: [
        {
          icon: "vback",
          type: "custom",
          id: "backs",
        },
      ],
      /* rightButtons: [{
        icon: 'vback',
        type: 'custom',
        id: 'wishlist',
      }] */
    };
    props.setNavButtons(buttons);
    //props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  static defaultProps = {
    object: {},
    isLoading: true,
  };

  _onNavigatorEvent = (event) => {
    /*  let isInWishList = this.props.user ?
       _.find(data.wishlistOff, (wishlist) => { return this.props.user.accountId === wishlist.id }) :
       false
  */
    if (event.id === "wishlist") {
      this.props.setWishlist(this.props.id, true);
    }

    if (event.id === "backs") {
      this.props.navigator.pop();
    }
  };

  componentDidMount() {
    const {
      wine: { id },
    } = this.props;
    let endpoint = "vintage";
    let query = {
      page: 0,
      limit: 30,
      order: false,
      filters: { "wine.id": id },
    };
    this.props.getRelated(endpoint, query);
    this.props.getDetail(this.props.id, {
      populate: "wine,winery,wishlistOff,userRates",
    });
    this.props.getComments(this.props.id);
    this.props.getRetailers(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    const {
      wine: { id },
    } = this.props;
    if (this.props.data && !nextProps.data) {
      let endpoint = "vintage";
      let query = {
        page: 0,
        limit: 30,
        order: false,
        filters: { "wine.id": id },
      };
      this.props.getRelated(endpoint, query);
      this.props.getDetail(this.props.id, {
        populate: "wine,winery,wishlistOff,userRates",
      });
      this.props.getComments(this.props.id);
      this.props.getRetailers(this.props.id);
    }

    if (!this.props.commentCreated && nextProps.commentCreated) {
      this.setState({ commentActive: false }, () => {
        this.refs.scrollView.scrollTo({
          x: 0,
          y: this.state.bottom,
          animated: true,
        });
      });
    }

    if (!this.props.rateIt && nextProps.rateIt) {
      this.setState({ rateModalOpen: false, temporalRate: 0 });
      this.props.getComments(this.props.id);
    }
  }

  componentWillUnmount() {
    this.props.clearDetail();
  }

  _goToWine = () => {
    const wine = this.props.data.wine;

    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      },
    });
  };

  _goToVintage = (vintage) => {
    this.props.clearDetail();
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      },
    });
  };

  _goToWinery = () => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.WINERY,
      title: this.props.data.winery.name,
      passProps: {
        id: this.props.data.winery.id,
      },
    });
  };

  _buildWineMakers() {
    let wineMakersEl = this.props.winery.wineMakers
      ? this.props.winery.wineMakers.map((wineMaker) => {
          return (
            <VideoBox
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

  _calculateAgeability = () => {
    let fromYear =
      Number(this.props.data.year) + Number(this.props.data.wine.ageability);
    let toYear =
      Number(this.props.data.year) + Number(this.props.data.wine.ageabilityTo);

    return fromYear + "-" + toYear;
  };

  _comment = (comment) => {
    this.props.comment(this.props.id, this.props.user.accountId, comment);
  };

  _onLikeComment = (commentId, like) => {
    if (!this.props.token) return;
    this.props.likeComment(commentId, this.props.user.accountId, like);
  };

  _rate = (points) => {
    this.setState({
      rateModalOpen: true,
      temporalRate: points,
    });
  };

  _onRate = (points, comment) => {
    this.props.rate(this.props.id, points, comment);
  };

  _setWishList = (wishlist) => {
    this.props.setWishlist(this.props.id, wishlist);
  };

  _calTasteScale = (value) => {
    let cal = value * 40 + 7;
    return cal;
  };

  _fetchRetailers = () => {
    this.setState({ retailerModalOpen: true });
  };

  render() {
    const {
      loading,
      data,
      zones,
      subZones,
      user,
      relatedResults,
      retailers,
      loadingRelated,
      id,
    } = this.props;

    if (loading || !data) {
      return <Loading />;
    }

    let varietalComposition = {};
    let varieties = data.varietalComposition
      ? data.varietalComposition.map((varietie, idx) => {
          varietalComposition = Object.assign(
            {},
            varietalComposition,
            varietie
          );
          return (
            <View
              key={Object.keys(varietie)[0]}
              style={{ flexDirection: "row", marginBottom: 5 }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 10,
                  backgroundColor: COLORS[idx],
                  marginRight: 8,
                }}
              />
              <Text style={[styles.infoValue, { fontSize: 14 }]}>
                {Object.values(varietie)[0] + "% "}
                {_.capitalize(VARIETIES_LABELS[Object.keys(varietie)[0]])}
              </Text>
            </View>
          );
        })
      : [];

    let varietalCompositionValues = Object.values(varietalComposition).map(
      (v) => {
        return Number(v);
      }
    );
    if (varietalCompositionValues.length == 1) {
      varietalCompositionValues.push(0.1);
    }

    let averageScore = 0;

    let isInWishList = this.props.user
      ? _.find(data.wishlistOff, (wishlist) => {
          return this.props.user.accountId === wishlist.id;
        })
      : false;

    let isReatedByMe = this.props.user
      ? _.find(data.userRates, (rate) => {
          return this.props.user.accountId === rate.user;
        })
      : false;

    let raiting = _.reduce(
      data.userRates,
      (sum, n) => {
        return sum + n.points;
      },
      0
    );

    if (data.userRates.length > 0) {
      raiting = Math.round((raiting / data.userRates.length) * 100) / 100;
    }

    let lang = I18n.locale.substr(0, 2);

    let province =
      data.province && data.province != ""
        ? _.find(STATES, { id: data.province })
        : null;
    let zone =
      data.zone && data.zone != "" ? _.find(zones, { id: data.zone }) : {};
    let subZone =
      data.subZone && data.subZone != ""
        ? _.find(subZones, { id: data.subZone })
        : null;

    /* noseToAfterTasteScale */
    let nose = data.noseToAfterTaste ? data.noseToAfterTaste["nose"] : 0;
    let attack = data.noseToAfterTaste ? data.noseToAfterTaste["attack"] : 0;
    let mouthfeel = data.noseToAfterTaste
      ? data.noseToAfterTaste["mouthfeel"]
      : 0;
    let finish = data.noseToAfterTaste ? data.noseToAfterTaste["finish"] : 0;
    let aftertaste = data.noseToAfterTaste
      ? data.noseToAfterTaste["aftertaste"]
      : 0;

    let hideNoseToAfterTaste =
      nose == 0 &&
      attack == 0 &&
      mouthfeel == 0 &&
      finish == 0 &&
      aftertaste == 0;
    let relatedVintages = _.filter(relatedResults, function (currentObject) {
      return currentObject.id != id;
    });

    return (
      <View style={styles.viewContainer}>
        <CommentViewContainer
          offset={Platform.OS === "ios" ? 65 : 85}
          active={this.state.commentActive}
          onClose={() => {
            this.setState({ commentActive: false });
          }}
          onComment={this._comment.bind(this)}
        >
          <ScrollView ref="scrollView">
            <View style={[styles.card, styles.infoCard]}>
              <View style={styles.generalInfoContainer}>
                <Text
                  style={{
                    fontFamily: "Raleway-Bold",
                    color: "#34404c",
                    fontSize: 24,
                    textAlign: "center",
                  }}
                >
                  {data.year} {data.wine.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Raleway-Regular",
                    color: "#34404c",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {data.winery.name}, {province ? province.name : "-"}
                </Text>
                <View
                  style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
                >
                  {data.frontLabel ? (
                    <View
                      style={{
                        flex: 1,
                        height: 260,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode={"cover"}
                        source={{ uri: config.MEDIA_BASE + data.frontLabel }}
                        style={{ height: 260, width: 140 }}
                        height={260}
                        width={140}
                      />
                    </View>
                  ) : (
                    <Image
                      resizeMode={"contain"}
                      source={GENERIC_BOTTLE}
                      style={{ height: 260, width: 140 }}
                      height={260}
                      width={140}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View style={styles.averageContainer}>
                        <Text style={styles.averageValue}>{data.rate}</Text>
                        <Text style={styles.averageLabel}>
                          {I18n.t("wine.points")}
                        </Text>
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          fontFamily: "Raleway-Regular",
                          color: "#34404c",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        ${data.suggestedPrice} USD
                      </Text>
                    </View>
                    {data.purchase !== "none" && (
                      <View style={{ width: "100%", marginTop: 10 }}>
                        <TouchableOpacity
                          disabled={data.purchase !== "wineClub"}
                          onPress={() =>
                            Linking.openURL(data.wineClubUrl).catch((err) => {})
                          }
                          style={[
                            styles.wineClubButton,
                            data.purchase !== "wineClub" && {
                              backgroundColor: "#ddd",
                            },
                          ]}
                        >
                          <View style={{ flexDirection: "row", padding: 10 }}>
                            <Image
                              style={styles.wineClubIcon}
                              source={IMG_WINECLUB}
                            />
                            <Text
                              style={[
                                styles.wineClubButtonLabel,
                                { marginLeft: 5, textAlign: "center" },
                              ]}
                            >
                              Purchase from Wine Club
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Button
                          label="Show All Buying Options"
                          disabled={data.purchase !== "other"}
                          labelStyle={{
                            fontSize: 14,
                            lineHeight: 14,
                            textAlign: "center",
                          }}
                          onPress={this._fetchRetailers}
                          style={{ height: 38, marginTop: 5 }}
                          rounded
                        />
                      </View>
                    )}
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          paddingTop: 5,
                          fontFamily: "Raleway-Regular",
                          color: colors.primaryColor,
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        User Rating
                      </Text>
                      <RaitingBar raiting={raiting} size={24} active={false} />
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Raleway-Regular",
                            color: colors.primaryColor,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {isReatedByMe ? "Your rate" : "Rate It!"}
                        </Text>
                        <RaitingBar
                          raiting={isReatedByMe ? isReatedByMe.points : 0}
                          size={22}
                          active={true}
                          onSetRate={(rate) => {
                            if (!this.props.user) {
                              this.props.dispatch({
                                type: "SET_VINTAGE_RATE_ERROR",
                                payload: {
                                  message: I18n.t("wine.rate_not_loged"),
                                },
                              });

                              return;
                            }

                            if (isReatedByMe) {
                              this.props.dispatch({
                                type: "SET_VINTAGE_RATE_ERROR",
                                payload: {
                                  message: I18n.t("wine.rate_error"),
                                },
                              });
                            } else {
                              this._rate(rate);
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <PieChart
                        chart_wh={120}
                        series={varietalCompositionValues}
                        sliceColor={COLORS}
                        doughnut={true}
                        coverRadius={0.78}
                        coverFill={"#FFF"}
                      />
                      <Text
                        style={{
                          paddingTop: 5,
                          fontFamily: "Raleway-Bold",
                          color: "#34404c",
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        {_.capitalize(data.wine.type)} Wine
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 10,
                        flex: 1,
                      }}
                    >
                      {varieties}
                    </View>
                  </View>
                  <View style={{ width: "100%", marginTop: 20 }}>
                    <Button
                      label={I18n.t("wine.view_winery")}
                      onPress={this._goToWinery}
                      style={{ marginLeft: 55, marginRight: 55, height: 42 }}
                      rounded
                    />
                  </View>
                </View>
              </View>

              {/* 
                !data.userSuggestion &&
                  <View style={ styles.badgesContainer }>
                    {
                      data.personality && data.personality.map(personality => {
                        return <PersonalityIcon name={ personality } key={ personality } width={ 48 } height={ 48 } />
                      })
                    }


                    {
                      //BadgeIconComponent
                      data.badges && data.badges.map(badge => {
                        return <BadgeIcon key={ badge.id } icon={ badge.image } width={ 48 } height={ 48 } />
                      })
                    }
                  </View> */}
            </View>

            {/* Vino App Rate  */}
            {!data.userSuggestion && (
              <View
                key="rate"
                style={[styles.card, { marginTop: 20, minHeight: 240 }]}
              >
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                  {/* <View style={styles.rate}>
                    <Text style={styles.rateValue}>{data.rate}</Text>
                    <Text style={styles.rateString}>VinoApp Rate</Text>
                  </View>
                */}
                  <Text style={styles.sectionTitle}>Tasting Information</Text>
                  <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                    <Text style={styles.fieldsTitle}>Tasting Date</Text>
                    <Text style={styles.fieldsValue}>
                      {data.tastingDate ? data.tastingDate : "-"}
                    </Text>
                  </View>

                  <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                    <Text style={styles.fieldsTitle}>Mood Pairing</Text>
                    <Text style={styles.fieldsValue}>
                      {data.mood && data.mood != "undefined" && data.mood != "0"
                        ? _.capitalize(data.mood)
                        : "-"}
                    </Text>
                  </View>

                  <View style={styles.mainAromas}>
                    <Text style={styles.fieldsTitle}>
                      {I18n.t("wine.main_aromas")}
                    </Text>
                    {_.isArray(data.mainAromas) && (
                      <View style={styles.aromasList}>
                        <MainAromaIcon
                          name={data.mainAromas[0]}
                          count={1}
                          style={{ flex: 1, borderLeftWidth: 0 }}
                        />
                        <MainAromaIcon
                          name={data.mainAromas[1]}
                          count={2}
                          style={{ flex: 1, borderLeftWidth: 0 }}
                        />
                        <MainAromaIcon
                          name={data.mainAromas[2]}
                          count={3}
                          style={{ flex: 1, borderLeftWidth: 0 }}
                        />
                      </View>
                    )}

                    <View style={styles.intensityWheelTitleContainer}>
                      <Text style={styles.intensityWheelTitle}>
                        {I18n.t("wine.intensity_wheel")}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ openModal: true });
                        }}
                        style={{
                          width: 20,
                          height: 20,
                          position: "absolute",
                          right: 10,
                          top: 0,
                          marginTop: 0,
                          flex: 1,
                          zIndex: 200,
                        }}
                      >
                        <Icon
                          name="md-help-circle"
                          size={18}
                          color={colors.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                      <View style={styles.notes}>
                        <View style={styles.noteItem}>
                          <View
                            style={[
                              styles.notePoint,
                              { backgroundColor: "#e90f4c" },
                            ]}
                          />
                          <Text style={styles.noteName}>
                            {I18n.t("wine.acidity")}
                          </Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View
                            style={[
                              styles.notePoint,
                              { backgroundColor: "#6d1d61" },
                            ]}
                          />
                          <Text style={styles.noteName}>
                            {I18n.t("wine.aroma")}
                          </Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View
                            style={[
                              styles.notePoint,
                              { backgroundColor: "#1b73a3" },
                            ]}
                          />
                          <Text style={styles.noteName}>
                            {I18n.t("wine.spice")}
                          </Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View
                            style={[
                              styles.notePoint,
                              { backgroundColor: "#50ba4a" },
                            ]}
                          />
                          <Text style={styles.noteName}>
                            {I18n.t("wine.fruit")}
                          </Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View
                            style={[
                              styles.notePoint,
                              { backgroundColor: "#d58f5f" },
                            ]}
                          />
                          <Text style={styles.noteName}>
                            {I18n.t("wine.wood")}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.intensityWheelContainer}>
                        <IntensityWheel
                          width={120}
                          height={120}
                          values={data.intensity}
                        />
                      </View>
                    </View>
                    {/* Tasting Note */}
                    <View style={[styles.bottomBar, { paddingBottom: 20 }]}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.fieldsTitle}>
                          {I18n.t("wine.tasting_note")}
                        </Text>
                        <Text
                          style={{
                            paddingTop: 5,
                            paddingBottom: 20,
                            paddingHorizontal: 10,
                            fontSize: 14,
                            color: "#34404c",
                            fontFamily: "Raleway-Regular",
                          }}
                        >
                          {data.tastingNote &&
                            (I18n.locale == "en"
                              ? data.tastingNote
                              : data.tastingNoteEs)}
                        </Text>
                      </View>
                      {!hideNoseToAfterTaste && (
                        <View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={[
                                styles.fieldsTitle,
                                { flex: 1, color: "#34404c", paddingTop: 5 },
                              ]}
                            >
                              Nose
                            </Text>
                            <View style={{ flex: 2.5, paddingRight: 10 }}>
                              <View
                                style={[
                                  { left: this._calTasteScale(nose) },
                                  styles.valueContainer,
                                  styles.valueContainerActive,
                                ]}
                              >
                                <Text style={styles.valueTextActive}>
                                  {nose}
                                </Text>
                                <View style={styles.triangle} />
                              </View>
                              <Progress.Bar
                                color={colors.primaryColor}
                                borderColor={colors.primaryColor}
                                borderRadius={10}
                                height={10}
                                progress={nose * 0.2}
                                width={200}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={[
                                styles.fieldsTitle,
                                { flex: 1, color: "#34404c", paddingTop: 5 },
                              ]}
                            >
                              Attack
                            </Text>
                            <View style={{ flex: 2.5, paddingRight: 10 }}>
                              <View
                                style={[
                                  { left: this._calTasteScale(attack) },
                                  styles.valueContainer,
                                  styles.valueContainerActive,
                                ]}
                              >
                                <Text style={styles.valueTextActive}>
                                  {attack}
                                </Text>
                                <View style={styles.triangle} />
                              </View>
                              <Progress.Bar
                                color={colors.primaryColor}
                                borderColor={colors.primaryColor}
                                borderRadius={10}
                                height={10}
                                progress={attack * 0.2}
                                width={200}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={[
                                styles.fieldsTitle,
                                { flex: 1, color: "#34404c", paddingTop: 5 },
                              ]}
                            >
                              Mouthfeel
                            </Text>
                            <View style={{ flex: 2.5, paddingRight: 10 }}>
                              <View
                                style={[
                                  { left: this._calTasteScale(mouthfeel) },
                                  styles.valueContainer,
                                  styles.valueContainerActive,
                                ]}
                              >
                                <Text style={styles.valueTextActive}>
                                  {mouthfeel}
                                </Text>
                                <View style={styles.triangle} />
                              </View>
                              <Progress.Bar
                                color={colors.primaryColor}
                                borderColor={colors.primaryColor}
                                borderRadius={10}
                                height={10}
                                progress={mouthfeel * 0.2}
                                width={200}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={[
                                styles.fieldsTitle,
                                { flex: 1, color: "#34404c", paddingTop: 5 },
                              ]}
                            >
                              Finish
                            </Text>
                            <View style={{ flex: 2.5, paddingRight: 10 }}>
                              <View
                                style={[
                                  { left: this._calTasteScale(finish) },
                                  styles.valueContainer,
                                  styles.valueContainerActive,
                                ]}
                              >
                                <Text style={styles.valueTextActive}>
                                  {finish}
                                </Text>
                                <View style={styles.triangle} />
                              </View>
                              <Progress.Bar
                                color={colors.primaryColor}
                                borderColor={colors.primaryColor}
                                borderRadius={10}
                                height={10}
                                progress={finish * 0.2}
                                width={200}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={[
                                styles.fieldsTitle,
                                { flex: 1, color: "#34404c", paddingTop: 5 },
                              ]}
                            >
                              Aftertaste
                            </Text>
                            <View style={{ flex: 2.5, paddingRight: 10 }}>
                              <View
                                style={[
                                  { left: this._calTasteScale(aftertaste) },
                                  styles.valueContainer,
                                  styles.valueContainerActive,
                                ]}
                              >
                                <Text style={styles.valueTextActive}>
                                  {aftertaste}
                                </Text>
                                <View style={styles.triangle} />
                              </View>
                              <Progress.Bar
                                color={colors.primaryColor}
                                borderColor={colors.primaryColor}
                                borderRadius={10}
                                height={10}
                                progress={aftertaste * 0.2}
                                width={200}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </View>

                    {/* Location View */}
                    <View style={[styles.bottomBar]}>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[styles.fieldsTitle, { textAlign: "center" }]}
                        >
                          Province
                        </Text>
                        <Text
                          style={[styles.fieldsTitle, { textAlign: "center" }]}
                        >
                          Zone
                        </Text>
                        <Text
                          style={[styles.fieldsTitle, { textAlign: "center" }]}
                        >
                          Subzone
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <View style={styles.zonesView}>
                          <Image
                            style={styles.zonesIcon}
                            source={IMG_PROVINCE}
                          />
                        </View>
                        <View style={styles.zonesView}>
                          <Image style={styles.zonesIcon} source={IMG_ZONE} />
                        </View>
                        <View style={styles.zonesView}>
                          <Image
                            style={styles.zonesIcon}
                            source={IMG_SUBZONE}
                          />
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text
                          style={[
                            styles.fieldsTitle,
                            {
                              color: "#34404c",
                              textAlign: "center",
                              fontSize: 14.5,
                            },
                          ]}
                        >
                          {province ? province.name : "-"}
                        </Text>
                        <Text
                          style={[
                            styles.fieldsTitle,
                            {
                              color: "#34404c",
                              textAlign: "center",
                              fontSize: 14.5,
                            },
                          ]}
                        >
                          {zone ? zone.name : "-"}
                        </Text>
                        <Text
                          style={[
                            styles.fieldsTitle,
                            {
                              color: "#34404c",
                              textAlign: "center",
                              fontSize: 14.5,
                            },
                          ]}
                        >
                          {subZone ? subZone.name : "-"}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                      <Text style={styles.fieldsTitle}>Organic</Text>
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          marginLeft: -5,
                          flexWrap: "wrap",
                        }}
                      >
                        {!_.isEmpty(data.organic) ? (
                          data.organic.map((v, i) => (
                            <Text
                              style={[
                                styles.fieldsValue,
                                { paddingRight: 1, flex: 0 },
                              ]}
                            >
                              {_.capitalize(data.organic[i] + ", ")}
                            </Text>
                          ))
                        ) : (
                          <Text style={styles.fieldsValue}>-</Text>
                        )}
                      </View>
                    </View>
                    <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                      <Text style={styles.fieldsTitle}>Barrel Aging</Text>
                      <Text style={styles.fieldsValue}>
                        {data.barrelAging ? data.barrelAging + " Months" : "-"}
                      </Text>
                    </View>
                    <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                      <Text style={styles.fieldsTitle}>Barrel Oak</Text>
                      <Text style={styles.fieldsValue}>
                        {data.oak ? _.capitalize(data.oak) + " Oak" : "-"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.bottomBar,
                        { flexDirection: "row", borderBottomWidth: 0 },
                      ]}
                    >
                      <Text style={styles.fieldsTitle}>Open Before</Text>
                      <Text style={styles.fieldsValue}>
                        {data.openBefore == "true" ? "Yes" : "No"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* data.userSuggestion &&
              <View style={[styles.card, { marginTop: 30, padding: 15, }]} elevation={1}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <View style={{ justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row' }}>
                    <Icon name={'md-contact'} size={48} color={colors.primaryColor} />
                    <View>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, marginLeft: 15, marginBottom: 5, color: '#444' }}>{I18n.t('wine.user_suggestion')}</Text>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 12, marginLeft: 15, color: '#34404c' }}>
                        {I18n.t('wine.user_suggestion_txt')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View> */}

            {user ? (
              !data.userSuggestion && (
                <View style={[styles.actions]}>
                  {this.props.token && (
                    <TouchableOpacity
                      style={[
                        styles.actionsButton,
                        { backgroundColor: colors.primaryColor },
                      ]}
                      onPress={() => {
                        this._setWishList(!isInWishList);
                      }}
                    >
                      <utils.bookmarkIcon size={24} />
                      {isInWishList ? (
                        <Text style={styles.actionsButtonText}>
                          {I18n.t("wine.remove_from_whislist")}
                        </Text>
                      ) : (
                        <Text style={styles.actionsButtonText}>
                          {I18n.t("wine.add_to_wishlist")}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              )
            ) : (
              <View />
            )}

            {/* Tasting Notes */}
            {/* {
              !data.userSuggestion &&
              <View style={[styles.card, { paddingLeft: 15, paddingRight: 15, flexDirection: 'row', paddingTop: 10, paddingBottom: 15, }]}>
                <Image source={TASTING_NOTE_IMG} />
                <View style={{ flex: 1, paddingLeft: 15, paddingTop: 5 }}>
                  <Text style={{ fontSize: 16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 5 }}>{I18n.t('wine.tasting_note')}</Text>
                  <Text style={{ fontSize: 12, color: '#34404c', fontFamily: 'Raleway-Regular' }}>{data.tastingNote && (I18n.locale == 'en' ? data.tastingNote : data.tastingNoteEs)}</Text>
                </View>
              </View>
            } */}

            {/* Info */}
            {!data.userSuggestion && (
              <View key="info" style={[styles.card, styles.infoContainer]}>
                <Text style={styles.sectionTitle}>
                  Information About This Wine
                </Text>
                <View
                  style={[styles.bottomBar, { flexDirection: "row" }]}
                ></View>
                <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                  <Text style={styles.fieldsTitle}>Sweetness</Text>
                  <Text style={styles.fieldsValue}>
                    {data.wine ? _.capitalize(data.wine.sweetness) : "-"}
                  </Text>
                </View>
                <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                  <Text style={styles.fieldsTitle}>Ageability</Text>
                  <Text style={styles.fieldsValue}>
                    {this._calculateAgeability()}
                  </Text>
                </View>
                <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                  <Text style={styles.fieldsTitle}>Serving Temp</Text>
                  <Text style={styles.fieldsValue}>
                    {data.wine ? data.wine.servingTemp + " ºC" : "-"}
                  </Text>
                </View>
                <View style={[styles.bottomBar, { flexDirection: "row" }]}>
                  <Text style={styles.fieldsTitle}>Single Vineyard</Text>
                  <Text style={styles.fieldsValue}>
                    {data.wine.singleVineyard ? "Yes" : "No"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.bottomBar,
                    { flexDirection: "row", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.fieldsTitle}>Elevation</Text>
                  <Text style={styles.fieldsValue}>
                    {data.wine ? data.wine.elevation + " mts" : "-"}
                  </Text>
                </View>
                {/* <View style={styles.infoRow}>
                  <View style={[styles.infoCol, { borderRightWidth: 1, borderColor: '#34404c', paddingRight: 5, marginRight: 15 }]}>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.body')}</Text>
                      <Text style={styles.infoValue}>
                        {
                          BODY_OPTIONS[lang][data.body]
                        }
                      </Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.sweetness')}</Text>
                      <Text style={styles.infoValue}>{_.capitalize(data.wine.sweetness)}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.finish')}</Text>
                      <Text style={styles.infoValue}>
                        {FINISH_OPTIONS[lang][data.finish]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoCol}>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84, marginRight: 5 }]}>{I18n.t('wine.ageability')}</Text>
                      <Text style={styles.infoValue}>{this._calculateAgeability()}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84, marginRight: 5 }]}>{I18n.t('wine.serving_temp')}</Text>
                      <Text style={styles.infoValue}>{data.wine.servingTemp}ºC</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84, marginRight: 5 }]}>{I18n.t('wine.decanter')}</Text>
                      <Text style={styles.infoValue}>
                        {
                          DECANTER_OPTIONS[lang][data.decanter]
                        }
                      </Text>
                    </View>
                  </View>
                </View> */}
              </View>
            )}

            {/* Info */}
            {/* {
              !data.userSuggestion &&
              <View key='info-2' style={[styles.card, styles.infoContainer]}>
                <View style={styles.infoRow}>
                  <View style={[styles.infoCol, { borderRightWidth: 1, borderColor: '#34404c', paddingLeft: 5, marginRight: 15 }]}>
                    <View style={[{ flex: 1, flexDirection: 'row', height: 30 }]}>
                      <Text style={[styles.vintagesTitle, { flex: 0, width: 100 }]}>{I18n.t('wine.analysis')}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>Alcohol</Text>
                      <Text style={styles.infoValue}>{data.alcohol}%</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>PH</Text>
                      <Text style={styles.infoValue}>{data.ph}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.acidity')}</Text>
                      <Text style={styles.infoValue}>{_.capitalize(data.acidity)}</Text>
                    </View>
                  </View>

                  <View style={styles.infoCol}>
                    <View style={[{ flex: 0, flexDirection: 'row' }]}>
                      <Text style={[styles.vintagesTitle, { flex: 0, width: 100 }]} >{I18n.t('wine.production')}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.cases')}</Text>
                      <Text style={styles.infoValue}>{data.cases_9l} M</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.aging')}</Text>
                      <Text style={styles.infoValue}>{data.barrelAging} months</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84 }]}>{I18n.t('wine.oak')}</Text>
                      <Text style={styles.infoValue}>{_.capitalize(data.oak)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            } */}

            {/* WineryAccess */}
            {/*  <View style={[styles.card, { marginTop: 30, padding: 20 }]} elevation={1}>
              <Text style={{ fontSize: 16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 15, textAlign: 'center' }}>{this.props.data.winery.name}</Text>
              <Button
                label={I18n.t('wine.view_winery')}
                onPress={this._goToWinery}
                style={{ marginLeft: 60, marginRight: 60, height: 36 }}
                rounded
              />
            </View> */}

            {/* WineMaker */}
            {/*}
            <View key='winemaker' style={ styles.wineMakersContainer }>
              <Text style={ styles.wineMakerTitle }>Winemakers Voice</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                { this._buildWineMakers() }
              </View>
            </View>
            */}

            {/* Pairings */}
            {/*
            <View key='pairings' style={ styles.pairingsContainer }>
              <Text style={ styles.pairingsTitle }>Some perfect matches with this wine</Text>
              <View style={{ flex: 1, flexDirection:'row', flexWrap: 'wrap', marginLeft: 2.5, marginRight: 2.5}}>
                <VideoBox
                  thumb={{ uri: 'https://i.ytimg.com/vi/X3Uo--FOakw/hqdefault.jpg'}}
                  width={ width/2 - 2.5 }
                  height={ 120 }/>

                <VideoBox
                  thumb={{ uri: 'https://i.ytimg.com/vi/X3Uo--FOakw/hqdefault.jpg'}}
                  width={ width/2 - 2.5 }
                  height={ 120 }/>
              </View>
            </View>
            */}

            {/* Related Vintages */}
            {/* <View key='related' style={[styles.card, { marginTop: 20 }]}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  {!data.frontLabel ?
                    <View style={{ flex: 1, height: 200, justifyContent: 'center', alignItems: 'center' }}>
                      <Image
                        resizeMode={'cover'}
                        source={{ uri: config.MEDIA_BASE + data.frontLabel }}
                        style={{ height: 200, width: 100 }}
                        height={200}
                        width={100} />
                    </View> :
                    <Image
                      source={GENERIC_BOTTLE}
                      style={{ height: 200, width: 100 }}
                      height={200}
                      width={100} />
                  }
                  <View style={styles.averageContainer}>
                    <Text style={styles.averageValue}>
                      {data.rate}
                    </Text>
                    <Text style={styles.averageLabel}>{I18n.t('wine.points')}</Text>
                  </View>
                </View>

              </View>
            </View> */}

            {/* {
              !loadingRelated && !_.isEmpty(relatedWines) && !userSuggestion ?
                <View key="related-wines" style={styles.relatedWinesContainer} elevation={1}>
                  <Text style={styles.relatedWinesTitle}>{I18n.t('wine.related_wines')}</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                      relatedWines.map(wine => {
                        return (
                          <TouchableOpacity style={{ width: 70, flex: 0, height: 147, marginLeft: 15, marginRight: 15, alignItems: 'center' }} key={'wine-' + wine.id} onPress={() => { this._goToWine(wine) }}>
                            {
                              wine.picture ?
                                <Image source={{ uri: 'http://api.vinoapp.co/api/images/' + wine.picture }} height={110} width={45} style={{ width: 45, height: 110 }} resizeMode={'contain'} /> :
                                <Image source={GENERIC_BOTTLE} />
                            }
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 11, color: '#34404c', textAlign: 'center', marginTop: 10 }}>{wine.name}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </View> : null
            } */}

            {!loadingRelated && !_.isEmpty(relatedVintages) ? (
              <View
                key="related"
                style={[styles.card, { marginTop: 20, paddingLeft: 20 }]}
              >
                <Text style={styles.sectionTitle}>
                  {I18n.t("wine.related_vintages")}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row", flexWrap: "wrap" }}
                >
                  {relatedVintages.map((vintage) => {
                    return true ? (
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
                              source={{
                                uri: config.MEDIA_BASE + vintage.frontLabel,
                              }}
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
                          <Text style={styles.relatedAverageValue}>
                            {vintage.rate}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : null;
                  })}
                </ScrollView>
              </View>
            ) : null}

            {/* Comments Box */}
            <View
              onLayout={(evt) => {
                let { height, y } = evt.nativeEvent.layout;
                let pos = y;
                this.setState({ bottom: pos });
              }}
            >
              <CommentsList
                title={I18n.t("article.comments")}
                objectType={"vintage"}
                loading={this.props.loadingComments}
                comments={this.props.comments}
                showButton={!this.state.commentActive && this.props.token}
                user={this.props.user ? this.props.user.accountId : null}
                writeComment={() => {
                  this.setState({ commentActive: true });
                }}
                onLikeComment={this._onLikeComment}
              />
            </View>

            {/* Related Wines 
            <View key="related-wines" style={ styles.relatedWinesContainer }>
              <Text style={ styles.relatedWinesTitle }>Related wines</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
              </View>
            </View>*/}
          </ScrollView>
        </CommentViewContainer>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.openModal}
          onRequestClose={() => {}}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            <View
              style={{
                margin: 15,
                backgroundColor: "#FFF",
                paddingHorizontal: 25,
                paddingVertical: 30,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 16.5,
                  fontFamily: "Raleway-Regular",
                  color: colors.primaryColor,
                  marginBottom: 5,
                  paddingTop: 10,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {I18n.t("wine.intensity_wheel")}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway-Regular",
                  fontSize: 13,
                  color: "#34404c",
                }}
              >
                The Wine Aroma Wheel is an incredible tool to learn about wines
                and enhance one’s ability to describe the complexity of flavor
                in red and white wines.{"\n"}
                Initially, most people can’t recognize or describe aromas so the
                purpose of the wheel is to provide terms to describe wine
                aromas.{"\n"}
                The wheel has very general terms located in the center (e.g.
                fruity or spicy), going to the most specific terms in the outer
                tier (such as strawberry or clove). These terms are NOT the only
                words that can be used to describe wines, but represent ones
                that are most often encountered.{"\n"}
                Easy to use and understand, it will enhance your whole wine
                experience.{"\n"}
              </Text>

              <Button
                onPress={() => {
                  this.setState({ openModal: false });
                }}
                style={{ marginLeft: 80, marginRight: 80, height: 30 }}
                rounded={true}
                label={I18n.t("close")}
              />
            </View>
          </View>
        </Modal>

        <RateModal
          open={this.state.rateModalOpen}
          rate={this.state.temporalRate}
          onRate={this._onRate}
          onClose={() => this.setState({ rateModalOpen: false })}
        />

        <RetailerModal
          title="Buy from trusted merchants."
          open={this.state.retailerModalOpen}
          data={retailers}
          onClose={() => this.setState({ retailerModalOpen: false })}
        />
      </View>
    );
  }
}

export default Screen(VintageView, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: "#F5F5F5",
  },
});

//<Image style={[styles.titleIcon, { width: 20, height: 25, flex: 0 }]} width={20} height={25} source={IC_PRODUCTION} />
