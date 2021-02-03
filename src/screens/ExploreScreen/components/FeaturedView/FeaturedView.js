import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";

import FeaturedCard from "../FeaturedCard";
import Spinner from "react-native-spinkit";

import I18n from "react-native-i18n";
import _ from "lodash";
import { colors } from "theme";
import styles from "./styles";

class FeaturedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  _featuredCard = (featuredWine) => {
    const { width, height } = Dimensions.get("window");
    let filterData = [];
    if (featuredWine.type == "explore") {
      featuredWine.data.map((item, index) => {
        filterData.push(
          <View style={{ flex: 1 }} key={index}>
            <FeaturedCard
              viewForExplore={true}
              object={item}
              onPress={this.props._navigateMention}
            />
          </View>
        );
      });
    } else if (featuredWine.type == "region") {
      featuredWine.data.map((item, index) => {
        filterData.push(
          <View style={{ flex: 1 }} key={index}>
            <FeaturedCard
              viewForExplore={true}
              object={item}
              onPress={this.props._navigateMention}
            />
          </View>
        );
      });
    }

    return filterData;
  };

  render() {
    const { index, flex } = this.state;
    const { featuredWine, loading, page, user, results, swp } = this.props;
    let fW = featuredWine.data && featuredWine.data.length;
    return (
      <View elevation={2} style={styles.featuredCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.postTitle}>Featured Wine</Text>
          {/* 
          <TouchableOpacity
            onPress={() => this.a.scrollToIndex(2, true)}
          ></TouchableOpacity> */}
          {fW ? (
            <Swiper
              ref={(ref) => (this.swiper = ref)}
              style={styles.swiperWrapper}
              dot={
                <View
                  style={{
                    backgroundColor: "#9b9b9b",
                    width: 6,
                    height: 6,
                    borderRadius: 4,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: "red",
                    width: 6,
                    height: 6,
                    borderRadius: 4,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                />
              }
              paginationStyle={{ position: "absolute", bottom: 10 }}
            >
              {this._featuredCard(featuredWine)}
            </Swiper>
          ) : (
            <View
              style={{
                minHeight: 250,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                isVisible={true}
                size={30}
                type={"Bounce"}
                color={colors.primaryColor}
              />
              <Text
                style={{ marginTop: 10, textAlign: "center", color: "#777" }}
              >
                {I18n.t("loading")}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default FeaturedView;
