import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import I18n from "react-native-i18n";
import ActionSheet from "react-native-actionsheet";
import ViewOverflow from "react-native-view-overflow";
import Screen from "hocs/ScreenHoc";
import NavStyles from "theme/NavigatorStyles";
import { SCREEN_IDS } from "screens";
import Slider from "components/Slider";
import FilterButton from "components/FilterButton";
import FilterChoice from "components/FilterChoice";
import ButtonTag from "components/ButtonTag";
import {
  WINE_FILTERS,
  BODY_OPTIONS,
  FINISH_OPTIONS,
  DECANTER_OPTIONS,
} from "constants/filters";
import AROMAS, { AROMAS_LABEL } from "constants/aromas";
import VARIETIES, { VARIETIES_LABELS } from "constants/varieties";
import PROVINCE, { PROVINCE_IDS } from "constants/states";
import ZONE, { ZONE_IDS } from "constants/zones";
import _ from "lodash";

import styles from "./styles";

class AdvancedSearchView extends React.Component {
  constructor(props) {
    super(props);
    const buttons = {
      leftButtons: [
        {
          icon: "vback",
          title: "CANCEL",
          type: "custom",
          id: "backs",
        },
      ],
      rightButtons: [
        {
          title: "APPLY",
          type: "custom",
          id: "search-result",
        },
      ],
    };
    props.setNavButtons(buttons);
    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  _onNavigatorEvent = (event) => {
    if (event.id === "search-result") {
      var filters = _.clone(this.state.filters);
      delete filters.ageability;

      console.tron.log("filters---", filters);

      if (filters["wine.varieties"].length > 0) {
        filters["wine.varieties"] = filters["wine.varieties"].join(",");
      }
      if (filters["province"].length > 0) {
        filters["province"] = filters["province"].join(",");
      }
      if (filters["zone"].length > 0) {
        filters["zone"] = filters["zone"].join(",");
      }

      if (filters["barrelAging"].lte === 36) {
        filters["barrelAging"].lte = 1000;
      }

      if (
        filters["wine.singleVineyard"] == -1 ||
        filters["wine.singleVineyard"] === undefined
      ) {
        filters["wine.singleVineyard"] = "";
      } else if (filters["wine.singleVineyard"] == 0) {
        filters["wine.singleVineyard"] = "false";
      } else {
        filters["wine.singleVineyard"] = "true";
      }

      this.props.navigator.push({
        screen: SCREEN_IDS.SEARCH_RESULTS,
        title: I18n.t("search.search"),
        passProps: {
          searchData: {
            //order: { averageScore : 'desc' },
            filters: filters,
          },
          searchType: "vintage",
        },
      });
    }

    if (event.id === "backs") {
      this.props.navigator.pop();
    }
  };

  state = {
    varietiesType: 0,
    avgScoreValue: 0,
    mainAromas: 0,
    filters: {
      ...WINE_FILTERS,
    },
  };

  componentDidMount() {
    let filters = this.state.filters;
    //  filters["year"].gte = this.props.years && this.props.years.gte;
    //  filters["year"].lte = this.props.years && this.props.years.lte;
    this.setState({
      filters,
    });
    console.tron.log("Ad-filters", this.state.filters["year"]);
  }

  _changeFilter = (filterName, filterValue, unique = true) => {
    let filters = this.state.filters;
    let value = filterValue;

    if (filters[filterName] == value && filterName != "wine.singleVineyard") {
      filters[filterName] = "";
    } else {
      if (unique) {
        filters[filterName] = value;
      } else {
        let values = filters[filterName] || [];
        if (values.indexOf(value) > -1) {
          _.remove(values, function (n) {
            return n == value;
          });
        } else {
          values.push(value);
        }

        filters[filterName] = values;
      }
    }

    this.setState({
      filters,
    });
  };

  _removeFilter = (filterName, filterValue) => {
    let filters = this.state.filters;
    let idx = filters[filterName].indexOf(filterValue);

    if (idx > -1) {
      _.remove(filters[filterName], (v) => {
        return v == filterValue;
      });
      if (filterName === "province" && filters["zone"].length !== 0) {
        _.remove(filters["zone"], (v, i) => {
          return v == filters["zone"][i];
        });
      }
    }

    this.setState({
      filters: filters,
    });
  };

  _addVariete = () => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.LIST_PICKER,
      title: I18n.t("wine.varieties"),
      passProps: {
        options: VARIETIES.filter(
          (v) => this.state.filters["wine.varieties"].indexOf(v.value) === -1
        ),
        onSelect: (value) => {
          let varieties = _.union(this.state.filters["wine.varieties"], [
            value,
          ]);
          this._changeFilter("wine.varieties", varieties);
          this.props.navigator.dismissModal();
        },
      },
    });
  };

  _addLocation = () => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.LIST_PICKER,
      title: I18n.t("wine.location"),
      passProps: {
        options: PROVINCE,
        onSelect: (value) => {
          let province = _.union(this.state.filters["province"], [value]);
          this._changeFilter("province", province);
          this.props.navigator.dismissModal();
        },
      },
    });
  };

  _addZone = (location) => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.LIST_PICKER,
      title: I18n.t("wine.zone"),
      passProps: {
        options: ZONE.filter((v) => v.state.indexOf(location) !== -1),
        onSelect: (value) => {
          let zones = _.union(this.state.filters["zone"], [value]);
          this._changeFilter("zone", zones);
          this.props.navigator.dismissModal();
        },
      },
    });
  };

  _addAroma = () => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.LIST_PICKER,
      title: I18n.t("wine.main_aromas"),
      passProps: {
        options: AROMAS[I18n.locale.substr(0, 2)],
        onSelect: (value) => {
          let aroma = _.union(this.state.filters["mainAromas"], [value]);
          this._changeFilter("mainAromas", aroma);
          this.props.navigator.dismissModal();
        },
      },
    });
  };

  render() {
    const { filters } = this.state;
    let yearsRange = this.props.years;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Type */}
          <View style={[styles.filterContainer, {}]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.type"))}
            </Text>
            <View
              style={[
                styles.card,
                {
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingLeft: 10,
                  paddingRight: 10,
                },
              ]}
            >
              <FilterButton
                label="Red"
                onPress={() => {
                  this._changeFilter("wine.type", "red");
                }}
                active={filters["wine.type"] == "red"}
              />
              <FilterButton
                label="White"
                onPress={() => {
                  this._changeFilter("wine.type", "white");
                }}
                active={filters["wine.type"] == "white"}
              />
              <FilterButton
                label="Rosé"
                onPress={() => {
                  this._changeFilter("wine.type", "rose");
                }}
                active={filters["wine.type"] == "rose"}
              />
              <FilterButton
                label="Sparkling"
                onPress={() => {
                  this._changeFilter("wine.type", "sparkling");
                }}
                active={filters["wine.type"] == "sparkling"}
              />
              <FilterButton
                label="Dessert"
                onPress={() => {
                  this._changeFilter("wine.type", "dessert");
                }}
                active={filters["wine.type"] == "dessert"}
              />
            </View>
          </View>

          {/* varieties */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.varieties"))}
            </Text>
            <View style={[styles.card]}>
              <FilterChoice
                choices={[
                  I18n.t("search.at_least_one"),
                  I18n.t("search.all_of_them"),
                ]}
                active={this.state.varietiesType}
                onChange={(value) => {
                  this.setState({ varietiesType: value });
                }}
                style={{ paddingLeft: 15 + "%", paddingRight: 15 + "%" }}
              />
            </View>
          </View>

          {/* Sweetness */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.sweetness"))}
            </Text>
            <ScrollView
              horizontal
              style={[
                styles.card,
                { flexDirection: "row", paddingLeft: 15, paddingRight: 15 },
              ]}
            >
              <FilterButton
                label="Dry"
                style={{ marginRight: 10 }}
                onPress={() => {
                  this._changeFilter("wine.sweetness", "dry");
                }}
                active={filters["wine.sweetness"] == "dry"}
              />

              <FilterButton
                label="Off-Dry"
                style={{ marginRight: 10 }}
                onPress={() => {
                  this._changeFilter("wine.sweetness", "off-dry");
                }}
                active={filters["wine.sweetness"] == "off-dry"}
              />
              <FilterButton
                label="Medium Dry"
                style={{ marginRight: 10 }}
                onPress={() => {
                  this._changeFilter("wine.sweetness", "medium-dry");
                }}
                active={filters["wine.sweetness"] == "medium-dry"}
              />
              <FilterButton
                label="Medium Sweet"
                style={{ marginRight: 10 }}
                onPress={() => {
                  this._changeFilter("wine.sweetness", "medium-sweet");
                }}
                active={filters["wine.sweetness"] == "medium-sweet"}
              />
              <FilterButton
                label="Sweet"
                style={{ marginRight: 30 }}
                onPress={() => {
                  this._changeFilter("wine.sweetness", "sweet");
                }}
                active={filters["wine.sweetness"] == "sweet"}
              />
            </ScrollView>
          </View>

          {/* Location */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.location"))}
            </Text>
            <View style={[styles.card]}>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#e7e7e7",
                }}
              >
                <Text style={[styles.locationHeader]}>PROVINCE</Text>
                <Text style={[styles.locationHeader]}>ZONE</Text>
              </View>
              <View>
                {_.isArray(filters["province"])
                  ? filters["province"].map((location) => {
                      return (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderColor: "#e7e7e7",
                            paddingTop: 10,
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "50.00%",
                                alignItems: "center",
                                paddingHorizontal: 8,
                              }}
                            >
                              <ButtonTag
                                key={location}
                                value={location}
                                label={PROVINCE_IDS[location]}
                                onPress={(value) => {
                                  this._removeFilter("province", value);
                                }}
                              />
                            </View>
                            <View
                              style={{
                                width: "50.00%",
                                alignItems: "center",
                                paddingHorizontal: 8,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  this._addZone(location);
                                }}
                              >
                                {filters["zone"].length === 0 && (
                                  <Text style={styles.addTag}>
                                    {I18n.t("search.add_zone")}
                                  </Text>
                                )}
                                {_.isArray(filters["zone"])
                                  ? filters["zone"].map((zone) => {
                                      return (
                                        <ButtonTag
                                          key={zone}
                                          value={zone}
                                          label={ZONE_IDS[zone]}
                                          onPress={(value) => {
                                            this._removeFilter("zone", value);
                                          }}
                                        />
                                      );
                                    })
                                  : []}
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    })
                  : []}
              </View>
              {filters["province"].length === 0 && (
                <TouchableOpacity
                  style={{ alignSelf: "center", marginTop: 20 }}
                  onPress={() => {
                    this._addLocation();
                  }}
                >
                  {
                    <Text style={[styles.addTag]}>
                      {I18n.t("search.add_location")}
                    </Text>
                  }
                </TouchableOpacity>
              )}

              {/* single vineyard */}
              <FilterChoice
                choices={["multi-vineyard", "single vineyard"]}
                active={filters["wine.singleVineyard"]}
                onChange={(value) => {
                  this._changeFilter("wine.singleVineyard", value);
                }}
                style={{
                  marginTop: 20,
                  paddingLeft: 15 + "%",
                  paddingRight: 15 + "%",
                }}
              />
              <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}
                onPress={() => {
                  this._addVariete();
                }}
              >
                <Text style={styles.addTag}>
                  {I18n.t("search.add_varieties")}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {_.isArray(filters["wine.varieties"])
                  ? filters["wine.varieties"].map((varietie) => {
                      return (
                        <ButtonTag
                          key={varietie}
                          value={varietie}
                          label={VARIETIES_LABELS[varietie]}
                          onPress={(value) => {
                            this._removeFilter("wine.varieties", value);
                          }}
                        />
                      );
                    })
                  : []}
              </View>
            </View>
          </View>

          {/* Elevation */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.elevation"))}
            </Text>
            <View
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  hideLabels={true}
                  hideAnima={true}
                  newMarker={true}
                  value={[
                    filters["wine.elevation"].gte,
                    filters["wine.elevation"].lte,
                  ]}
                  min={0}
                  max={3000}
                  step={1}
                  onChange={(values) => {
                    this._changeFilter("wine.elevation", {
                      gte: values[0],
                      lte: values[1],
                    });
                  }}
                />
              </View>
            </View>
          </View>

          {/* Ageability */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.ageability"))}
            </Text>
            <View
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  hideLabels={true}
                  hideAnima={true}
                  newMarker={true}
                  minLabel={"Now"}
                  unit={"years"}
                  value={[
                    filters["wine.ageability"].gte,
                    filters["wine.ageability"].lte,
                  ]}
                  min={0}
                  max={36}
                  step={1}
                  onChange={(values) => {
                    this._changeFilter("wine.ageability", {
                      gte: values[0],
                      lte: values[1],
                    });
                  }}
                />
              </View>
            </View>
          </View>

          {/* Price Range */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.price_range"))}
            </Text>
            <View
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  hideLabels={true}
                  hideAnima={true}
                  newMarker={true}
                  minLabel={"$1"}
                  //maxLabel={'$1000\nor more'}
                  maxLabel={"$300"}
                  value={[
                    filters["suggestedPrice"].gte,
                    filters["suggestedPrice"].lte,
                  ]}
                  min={1}
                  max={300}
                  step={1}
                  onChange={(values) => {
                    this._changeFilter("suggestedPrice", {
                      gte: values[0],
                      lte: values[1],
                    });
                  }}
                  suffix={"USD"}
                />
              </View>
            </View>
          </View>

          {/* VinoApp Rate */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.vinoapp_rate"))}
            </Text>
            <ViewOverflow
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  hideLabels={true}
                  hideAnima={true}
                  newMarker={true}
                  min={70}
                  max={100}
                  suffix={"pts"}
                  value={[
                    filters["wine.averageScore"].gte,
                    filters["wine.averageScore"].lte,
                  ]}
                  onChange={(values) =>
                    this._changeFilter("wine.averageScore", {
                      gte: values[0],
                      lte: values[1],
                    })
                  }
                  step={1}
                  hideLabels={true}
                />
              </View>
            </ViewOverflow>
          </View>

          {/* Intensity Wheel */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.intensity_wheel"))}
            </Text>
            <View
              style={[styles.card, { flexDirection: "column", padding: 20 }]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 75,
                    fontFamily: "GothamRounded-Book",
                    color: "#4a4a4a",
                  }}
                >
                  {_.upperCase(I18n.t("wine.acidity"))}
                </Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    min={0}
                    max={5}
                    value={[
                      filters["intensity.acidity"].gte,
                      filters["intensity.acidity"].lte,
                    ]}
                    onChange={(values) =>
                      this._changeFilter("intensity.acidity", {
                        gte: values[0],
                        lte: values[1],
                      })
                    }
                    step={1}
                    hideLabels={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 75,
                    fontFamily: "GothamRounded-Book",
                    color: "#4a4a4a",
                  }}
                >
                  {_.upperCase(I18n.t("wine.aroma"))}
                </Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={[
                      filters["intensity.aroma"].gte,
                      filters["intensity.aroma"].lte,
                    ]}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(values) => {
                      this._changeFilter("intensity.aroma", {
                        gte: values[0],
                        lte: values[1],
                      });
                    }}
                    hideLabels={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 75,
                    fontFamily: "GothamRounded-Book",
                    color: "#4a4a4a",
                  }}
                >
                  {_.upperCase(I18n.t("wine.spice"))}
                </Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={[
                      filters["intensity.spice"].gte,
                      filters["intensity.spice"].lte,
                    ]}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(values) => {
                      this._changeFilter("intensity.spice", {
                        gte: values[0],
                        lte: values[1],
                      });
                    }}
                    hideLabels={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 75,
                    fontFamily: "GothamRounded-Book",
                    color: "#4a4a4a",
                  }}
                >
                  {_.upperCase(I18n.t("wine.fruit"))}
                </Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={[
                      filters["intensity.fruit"].gte,
                      filters["intensity.fruit"].lte,
                    ]}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(values) => {
                      this._changeFilter("intensity.fruit", {
                        gte: values[0],
                        lte: values[1],
                      });
                    }}
                    hideLabels={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    width: 75,
                    fontFamily: "GothamRounded-Book",
                    color: "#4a4a4a",
                  }}
                >
                  {_.upperCase(I18n.t("wine.wood"))}
                </Text>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={[
                      filters["intensity.wood"].gte,
                      filters["intensity.wood"].lte,
                    ]}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(values) => {
                      this._changeFilter("intensity.wood", {
                        gte: values[0],
                        lte: values[1],
                      });
                    }}
                    hideLabels={true}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Main Aromas */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.main_aromas"))}
            </Text>
            <View style={[styles.card, { marginBottom: 10 }]}>
              <FilterChoice
                choices={[
                  I18n.t("search.at_least_one"),
                  I18n.t("search.all_of_them"),
                ]}
                active={this.state.mainAromas}
                onChange={(value) => {
                  this.setState({ mainAromas: value });
                }}
                style={{ paddingLeft: 15 + "%", paddingRight: 15 + "%" }}
              />

              <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 20, marginBottom: 10 }}
                onPress={this._addAroma}
              >
                <Text style={styles.addTag}>{I18n.t("search.add_aroma")}</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {filters["mainAromas"]
                  ? filters["mainAromas"].map((aroma) => {
                      return (
                        <ButtonTag
                          key={aroma}
                          label={AROMAS_LABEL[I18n.locale.substr(0, 2)][aroma]}
                          value={aroma}
                          onPress={(value) => {
                            this._removeFilter("mainAromas", value);
                          }}
                        />
                      );
                    })
                  : []}
              </View>
            </View>
          </View>

          {/* Body/Decanter/Finish */}
          <View style={[styles.filterContainer]}>
            <View
              style={[styles.card, { flexDirection: "column", padding: 20 }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Raleway-Regular",
                    fontSize: 13,
                    color: "#34404c",
                    flex: 1,
                  }}
                >
                  {_.upperCase(I18n.t("wine.body"))}
                </Text>
                <TouchableOpacity onPress={() => this.bodyActionSheet.show()}>
                  {!filters["body"] ? (
                    <Text style={styles.addTag}>{I18n.t("search.choose")}</Text>
                  ) : (
                    <Text style={{}}>
                      {
                        _.find(BODY_OPTIONS[I18n.locale.substr(0, 2)], (d) => {
                          return d.value == filters["body"];
                        }).name
                      }
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Raleway-Regular",
                    fontSize: 13,
                    color: "#34404c",
                    flex: 1,
                  }}
                >
                  {_.upperCase(I18n.t("wine.finish"))}
                </Text>
                <TouchableOpacity onPress={() => this.finishActionSheet.show()}>
                  {!filters["finish"] ? (
                    <Text style={styles.addTag}>{I18n.t("search.choose")}</Text>
                  ) : (
                    <Text style={{}}>
                      {
                        _.find(
                          FINISH_OPTIONS[I18n.locale.substr(0, 2)],
                          (d) => {
                            return d.value == filters["finish"];
                          }
                        ).name
                      }
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Raleway-Regular",
                    fontSize: 13,
                    color: "#34404c",
                    flex: 1,
                  }}
                >
                  {_.upperCase(I18n.t("wine.decanter"))}
                </Text>
                <TouchableOpacity
                  onPress={() => this.decanterActionSheet.show()}
                >
                  {!filters["decanter"] ? (
                    <Text style={styles.addTag}>{I18n.t("search.choose")}</Text>
                  ) : (
                    <Text style={{}}>
                      {
                        _.find(
                          DECANTER_OPTIONS[I18n.locale.substr(0, 2)],
                          (d) => {
                            return d.value == filters["decanter"];
                          }
                        ).name
                      }
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* vintage */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.vintage"))}
            </Text>
            <View
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  value={[
                    filters["year"].gte == 0
                      ? yearsRange.gte
                      : filters["year"].gte,
                    filters["year"].lte == 0
                      ? yearsRange.lte
                      : filters["year"].lte,
                  ]}
                  min={yearsRange.gte}
                  max={yearsRange.lte}
                  step={1}
                  onChange={(values) => {
                    this._changeFilter("year", {
                      gte: values[0],
                      lte: values[1],
                    });
                  }}
                />
              </View>
            </View>
          </View>

          {/* Oak */}
          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.oak"))}
            </Text>
            <ScrollView
              horizontal
              style={[
                styles.card,
                { flexDirection: "row", paddingLeft: 15, paddingRight: 15 },
              ]}
            >
              <FilterButton
                label={
                  I18n.locale.substr(0, 2) == "en" ? "french" : "Roble Francés"
                }
                onPress={() => {
                  this._changeFilter("oak", "french", true);
                }}
                active={filters["oak"].indexOf("french") > -1}
              />
              <FilterButton
                label={
                  I18n.locale.substr(0, 2) == "en"
                    ? "american"
                    : "Roble Americano"
                }
                onPress={() => {
                  this._changeFilter("oak", "American", true);
                }}
                active={filters["oak"].indexOf("American") > -1}
              />
              <FilterButton
                label={
                  I18n.locale.substr(0, 2) == "en" ? "mix" : "Mix de Robles"
                }
                onPress={() => {
                  this._changeFilter("oak", "mix", true);
                }}
                active={filters["oak"].indexOf("mix") > -1}
              />
              <FilterButton
                label={I18n.locale.substr(0, 2) == "en" ? "Steel" : "Acero"}
                onPress={() => {
                  this._changeFilter("oak", "steel", true);
                }}
                active={filters["oak"].indexOf("steel") > -1}
              />
              <FilterButton
                label={
                  I18n.locale.substr(0, 2) == "en" ? "Concrete" : "Concreto"
                }
                onPress={() => {
                  this._changeFilter("oak", "concrete", true);
                }}
                active={filters["oak"].indexOf("concrete") > -1}
              />
              <FilterButton
                label={
                  I18n.locale.substr(0, 2) == "en" ? "Ceramic" : "Cerámica"
                }
                onPress={() => {
                  this._changeFilter("oak", "ceramic", true);
                }}
                active={filters["oak"].indexOf("ceramic") > -1}
              />
              <FilterButton
                style={{ marginRight: 30 }}
                label={I18n.locale.substr(0, 2) == "en" ? "Other" : "Otros"}
                onPress={() => {
                  this._changeFilter("oak", "other", true);
                }}
                active={filters["oak"].indexOf("other") > -1}
              />
            </ScrollView>
          </View>

          <View style={[styles.filterContainer]}>
            <Text style={styles.filterTitle}>
              {_.upperCase(I18n.t("wine.months"))}
            </Text>
            <View
              style={[
                styles.card,
                { flexDirection: "row", paddingTop: 20, paddingBottom: 20 },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  value={[
                    filters["barrelAging"].gte,
                    filters["barrelAging"].lte,
                  ]}
                  min={0}
                  max={36}
                  maxLabel={"36+"}
                  step={1}
                  onChange={(values) => {
                    this._changeFilter("barrelAging", {
                      gte: values[0],
                      lte: values[1],
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <ActionSheet
          ref={(o) => (this.bodyActionSheet = o)}
          title={I18n.t("wine.body")}
          options={BODY_OPTIONS[I18n.locale.substr(0, 2)]
            .map((option) => option.name)
            .concat([I18n.t("cancel")])}
          destructiveButtonIndex={4}
          onPress={(index) => {
            if (index !== 4) {
              this._changeFilter(
                "body",
                BODY_OPTIONS[I18n.locale.substr(0, 2)][index]["value"]
              );
            }
          }}
        />

        <ActionSheet
          ref={(o) => (this.decanterActionSheet = o)}
          title={I18n.t("wine.decanter")}
          options={DECANTER_OPTIONS[I18n.locale.substr(0, 2)]
            .map((option) => option.name)
            .concat([I18n.t("cancel")])}
          destructiveButtonIndex={4}
          onPress={(index) => {
            if (index !== 4) {
              this._changeFilter(
                "decanter",
                DECANTER_OPTIONS[I18n.locale.substr(0, 2)][index]["value"]
              );
            }
          }}
        />

        <ActionSheet
          ref={(o) => (this.finishActionSheet = o)}
          title={I18n.t("wine.finish")}
          options={FINISH_OPTIONS[I18n.locale.substr(0, 2)]
            .map((option) => option.name)
            .concat([I18n.t("cancel")])}
          destructiveButtonIndex={4}
          onPress={(index) => {
            if (index !== 4) {
              this._changeFilter(
                "finish",
                FINISH_OPTIONS[I18n.locale.substr(0, 2)][index]["value"]
              );
            }
          }}
        />
      </View>
    );
  }
}

export default Screen(AdvancedSearchView, {
  title: "menu.advanced_search",
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: "#F5F5F5",
  },
});
