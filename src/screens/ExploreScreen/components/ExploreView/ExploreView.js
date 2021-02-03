import React from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Platform,
  TouchableOpacity,
  StatusBar,
  Linking
} from "react-native";
import Screen from "hocs/ScreenHoc";
import { SCREEN_IDS } from "screens";
import NavStyles from "theme/NavigatorStyles";
import _ from "lodash";
import FeaturedView from "../FeaturedView";
import ExperCard from "../ExpertCard";
import ArgentinaCard from "../ArgentinaCard";
import { colors } from "theme";

import styles from "./styles";

const _goToSearchImage = require("images/explore/wineClub.jpg");

class ExploreView extends React.Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor(colors.primaryColor);
    this.state = {
      tabUnmount: false,
      scrollTo: false,
      entries: [{ title: "a" }, { title: "b" }, { title: "c" }],
    };
  }

  componentWillMount() {
    let index = Number(this.props.redirectTo);
    if (index != 0) {
      this.props.navigator.switchToTab({
        tabIndex: index,
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.id === "didDisappear") {
      this.setState({
        tabUnmount: true,
      });
    }
    if (event.id === "didAppear") {
      this.setState({
        tabUnmount: false,
      });
    }
  }

  componentDidMount() {
    const { featuredWineSearch, search } = this.props;
    let endpoint = "vintage";
    let query = {
      page: 0,
      limit: 30,
      order: false,
      filters: { featuring: "true" },
    };
    featuredWineSearch(endpoint, query);
  }

  _goToSearch = () => {
    this.props.navigator.switchToTab({
      tabIndex: 2,
    });
  };

  _goToArgentina = () => {
    this.setState({
      scrollTo: true,
    });
    this.props.navigator.switchToTab({
      tabIndex: 3,
    });
  };

  _navigateMention = (type, vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      },
    });
  };

  render() {
    const { data, user, featuredWineResults, results } = this.props;
    let fW = featuredWineResults && featuredWineResults.length;
    return (
      <ScrollView
        onLayout={(event) => {
          this.sH = event.nativeEvent.layout.height;
        }}
        ref={(ref) => (this.scrollView = ref)}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View elevation={2} style={[styles.goToSearchCard, styles.shadowCard]}>
          <ImageBackground
            resizeMode="cover"
            style={{ width: 100 + "%", height: 200 }}
            source={_goToSearchImage}
          >
            <TouchableOpacity
              style={{ flex: 1, justifyContent: "center" }}
              onPress={() => Linking.openURL(
                "https://club.vinoapp.co/"
              ).catch((err) => {})}
              activeOpacity={0.8}
            ></TouchableOpacity>
          </ImageBackground>
        </View>
        {fW ? (
          <FeaturedView
            _navigateMention={this._navigateMention}
            featuredWine={{ type: "explore", data: featuredWineResults }}
          />
        ) : (
          <View />
        )}
        <ExperCard tabUnmount={this.state.tabUnmount} />
        <ArgentinaCard
          sH={this.sH}
          scrollView={this.scrollView}
          goToArgentina={this._goToArgentina}
        />
      </ScrollView>
    );
  }
}

export default Screen(ExploreView, {
  title: "menu.explore",
  navigatorStyle: {
    ...NavStyles.tab,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
  },
});
