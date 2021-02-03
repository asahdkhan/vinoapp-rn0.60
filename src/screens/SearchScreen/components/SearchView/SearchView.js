import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/Ionicons";
import Screen from "hocs/ScreenHoc";
import { SCREEN_IDS } from "screens";
import NavStyles from "theme/NavigatorStyles";
import _ from "lodash";

import styles from "./styles";
import { colors } from "theme";

const searchImg = require("images/search/main_search.jpg");

const searchIcon = require("images/search/topsearch.png");
const new_NotableIcon = require("images/search/notable.png");
const new_ExpertIcon = require("images/search/expert.png");
const new_ValueIcon = require("images/search/value.png");
const new_VarietyIcon = require("images/search/variety.png");
const new_moodIcon = require("images/search/mood.png");
const new_LocationIcon = require("images/search/location.png");
const new_AdditionalFiltersIcon = require("images/search/additionalfilter.png");

const IMG_VARIETAL = require("images/search/ic-varietal.png");
const IMG_ZONES = require("images/search/ic-zone.png");
const IMG_CELLAR = require("images/search/ic-cellar.png");
const IMG_VALUE = require("images/search/ic-value.png");
const IMG_SEARCH = require("images/search/ic-advanced-white.png");

class SearchView extends React.Component {
  state = {
    searchValue: "",
  };

  componentDidMount() {
    let query = {
      page: 0,
      limit: 1,
      order: { year: "asc" },
    };
    this.props.getDynamicYears("vintage", query);
  }

  _search = () => {
    if (this.state.searchValue != "") {
      this.props.navigator.push({
        screen: SCREEN_IDS.SEARCH_RESULTS,
        title: I18n.t("menu.search"),
        passProps: {
          searchData: {
            query: this.state.searchValue,
          },
          searchType: "vintage",
        },
      });
    }
  };

  _onSearchChange = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  _onKeyPress = (evt) => {
    if (this.state.searchValue != "" && evt.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
      this._search();
    }
  };

  _searchRanking = () => {
    this.props.navigator.push({
      screen: SCREEN_IDS.SEARCH_RESULTS,
      title: I18n.t("search.search"),
      passProps: {
        searchData: {
          order: { averageScore: "desc" },
        },
        searchType: "vintage",
      },
    });
  };

  _specialSearch = (config) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.SPECIAL_SEARCH,
      backButtonHidden: true,
      passProps: {
        ...config,
      },
    });
  };

  _expertSearch = (config) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.EXPERT,
      backButtonHidden: true,
    });
  };

  _advancedSearch = () => {
    this.props.navigator.push({
      screen: SCREEN_IDS.ADVANCED_SEARCH,
      backButtonHidden: true,
    });
  };

  render() {
    //this._searchRanking()
    return (
      <ScrollView style={styles.viewContainer}>
        <View style={styles.searchField} elevation={2}>
          <TextInput
            value={this.state.searchValue}
            style={styles.input}
            onChangeText={this._onSearchChange}
            onKeyPress={this._onKeyPress}
            placeholder={I18n.t("search.search_box")}
            placeholderTextColor={"#34404c"}
            autoCapitalize={"none"}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            onSubmitEditing={this._search}
            returnKeyType="done"
            autoFocus={false}
          />
          <TouchableOpacity style={styles.searchCamera} onPress={this._search}>
            <Image style={{}} source={searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5 }}>
          <Image
            resizeMode="cover"
            style={{
              flex: 1,
              width: 100 + "%",
              height: 200,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={searchImg}
          />
        </View>
        <View style={styles.specialSearchs}>
          <Text style={styles.title}>{I18n.t("search.search_label")}</Text>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => this._searchRanking()}
              >
                <Image style={styles.boxIcon} source={new_NotableIcon} />
                <Text style={styles.boxText}>{I18n.t("search.featured")}</Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => this._expertSearch()}
              >
                <Image style={styles.boxIcon} source={new_ExpertIcon} />
                <Text style={styles.boxText}>
                  {I18n.t("search.best_rated")}
                </Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => {
                  this._specialSearch({ filterType: "mood" });
                }}
              >
                <Image style={styles.boxIcon} source={new_moodIcon} />
                <Text style={styles.boxText}>{I18n.t("search.mood")}</Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => {
                  this._specialSearch({ filterType: "value" });
                }}
              >
                <Image style={styles.boxIcon} source={new_ValueIcon} />
                <Text style={styles.boxText}>{I18n.t("search.value")}</Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => {
                  this._specialSearch({ filterType: "varietal" });
                }}
              >
                <Image style={styles.boxIcon} source={new_VarietyIcon} />
                <Text style={styles.boxText}>{I18n.t("search.variety")}</Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box} elevation={2}>
              <TouchableOpacity
                style={styles.boxTouch}
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigator.switchToTab({ tabIndex: 3 });
                }}
              >
                <Image style={styles.boxIcon} source={new_LocationIcon} />
                <Text style={styles.boxText}>{I18n.t("search.zone")}</Text>
                <View style={styles.boxArrow}>
                  <Icon
                    name="ios-arrow-forward"
                    color={colors.primaryColor}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.row}>
            <View style={ styles.box } elevation={2}>            
              <TouchableOpacity
                style={ styles.boxTouch }
                activeOpacity={0.8}
                onPress={() => { this._specialSearch({ filterType: 'cellar'}) }}
              >
                <Image source={ IMG_CELLAR } />
                <Text style={ styles.boxText }>{ _.upperCase(I18n.t('search.winery')) }</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={[styles.row, { alignItems: "center" }]}>
            <View style={[styles.extraBoxContainer]}>
              <TouchableOpacity
                style={[styles.extraBox]}
                activeOpacity={0.8}
                onPress={this._advancedSearch}
              >
                <View style={styles.extraBoxView}>
                  <Image source={new_AdditionalFiltersIcon} />
                  <Text style={styles.extraBoxText}>
                    {I18n.t("search.advanced_search")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Screen(SearchView, {
  title: "menu.search",
  navigatorStyle: {
    ...NavStyles.tab,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
    // drawUnderNavBar  : true,
    // navBarTransparent: true,
    // navBarTranslucent: true,
  },
});
