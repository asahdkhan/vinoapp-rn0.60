import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StatusBar,
  Platform,
  WebView,
} from "react-native";
import I18n from "react-native-i18n";
import Spinner from "react-native-spinkit";
import Screen from "hocs/ScreenHoc";
import { SCREEN_IDS } from "screens";
import NavStyles from "theme/NavigatorStyles";
import { colors } from "theme";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

import styles from "./styles";

class BlogView extends React.Component {
  state = {};

  constructor(props) {
    super();
    this.props = props;
    this.state = { webviewLoaded: false };
    this.monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchBlogPost(1, 100);
  }

  _convertDate = (date) => {
    let d = date.split("T")[0];
    d = d.split("-");
    let ind = d[1] - 1;
    let day = d[2];
    let year = d[0];
    let month = this.monthArr[ind];
    let newDate = month + " " + day + ", " + year;
    return newDate;
  };

  _goToFeedDetails = (id) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.BLOG_DETAILS,
      passProps: {
        id,
      },
    });
  };

  injectScript = `
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;

  _renderItem = ({ item, index }) => {
    const {
      id,
      fimg_url,
      title,
      date,
      metadata: { copete },
    } = item;
    let desc = copete[0].replace(/&nbsp;/g, "");
    let html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
    ${desc}
    </body></html>`;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this._goToFeedDetails(id)}
      >
        <Image
          source={{ uri: fimg_url }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={styles.title}>{item.title.rendered}</Text>
          <View style={{ height: 160, width: "100%", overflow: "hidden" }}>
              <WebView
                originWhitelist={["*"]}
                source={{
                  html: html,
                }}
                injectedJavaScript={this.injectScript}
              />
            </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.authorName}>
              {item.author_meta.display_name}
            </Text>
            <Text style={styles.date}>{this._convertDate(item.date)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _getMore = () => {
    const { category, page, limit, total, loading } = this.props;
    const hasMore = page * limit < total;
    if (!loading && hasMore && !category) {
      let pageInc = page + 1;
      this.props.fetchBlogPost(pageInc, limit);
    }
    if (!loading && hasMore && category) {
      let pageInc = page + 1;
      this.props.fetchPostByCategory(pageInc, limit, category);
    }
  };

  _onChangeCategory = (idx) => {
    if (idx == 0) {
      this.props.fetchBlogPost(1, 100);
    } else {
      const num = this.props.categories[idx - 1];
      this.props.fetchPostByCategory(1, 100, num.id);
    }
  };

  render() {
    const { data, loading, page, categories } = this.props;
    let categoriesName = _.reduce(
      categories,
      (prev, current) => {
        prev.push(current.name);
        return prev;
      },
      ["All"]
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#F5F5F5", padding: 8 }}>
          <Text style={styles.settingsActionText}>Categories</Text>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ModalDropdown
              ref={(ref) => (this.dropDown = ref)}
              defaultValue={"All"}
              style={{
                width: 150,
                position: "absolute",
                right: 0,
                bottom: 0,
                zIndex: 999,
              }}
              textStyle={{
                fontSize: 15,
                textAlign: "center",
                fontFamily: "Raleway-SemiBold",
                color: "#34404c",
              }}
              dropdownStyle={{ width: 150, height: 400 }}
              dropdownTextStyle={{
                fontSize: 15,
                fontFamily: "Raleway-Regular",
                color: "#34404c",
              }}
              dropdownTextHighlightStyle={{ color: colors.primaryColor }}
              adjustFrame={(style) => {
                style.top += 48;
                //style.right += 5;
                return style;
              }}
              options={categoriesName}
              onSelect={(idx, value) => {
                this._onChangeCategory(idx);
              }}
            ></ModalDropdown>
            <Icon
              name="angle-down"
              size={22}
              style={[
                styles.settingsActionIcon,
                { position: "absolute", right: 10, bottom: -2 },
              ]}
            />
          </View>
        </View>
        {loading && page == 1 ? (
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
            <Text style={{ marginTop: 10, textAlign: "center", color: "#777" }}>
              {I18n.t("loading")}
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            extraData={data}
            keyExtractor={(item) => item.id}
            renderItem={this._renderItem}
            contentContainerStyle={{ paddingBottom: 10 }}
            style={{ paddingTop: 10, backgroundColor: "#F6F6F6" }}
            /* ListFooterComponent={() => (
            loading ?
              <View style={{ minHeight: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner
                  isVisible={true}
                  size={30}
                  type={'Bounce'}
                  color={colors.primaryColor}
                />
              </View> : null
          )} */
            // onEndReached={this._getMore}
            // onEndReachedThreshold={0.7}
          />
        )}
      </View>
    );
  }
}

export default Screen(BlogView, {
  title: "menu.blog",
  navigatorStyle: NavStyles.tab,
});
