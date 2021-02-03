import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, Platform } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Screen from 'hocs/ScreenHoc'
import Button from 'components/Button'
import FeaturedView from 'screens/ExploreScreen/components/FeaturedView'
import { SCREEN_IDS, } from 'screens'
import ZonesImage from '../ZonesImageCard'

import NavStyles from 'theme/NavigatorStyles'
import styles from './styles'
import { colors, utils, } from 'theme'

class RegionDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headerVisible: true
    }
  }

  componentDidMount() {
    const { location, state, page, limit, } = this.props
    const bestRated = { averageScore: 'desc' }

    let query = location &&
      {
        filters: {
          'province': location.id,
        }, page: 0, limit: 5, order: bestRated
      }
    this.props.featuredWineSearch(query)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  _navigateMention = (type, vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  _buildForeground = (location) => (
    <View style={styles.coverContainer}>
      <View style={{ flex: 1 }}>
        <ImageBackground style={styles.cover} source={location.image}>
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>{location.label}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  )


  _buildHeader = () => {
    let headerVisible = this.state.headerVisible ? {} : { backgroundColor: colors.primaryColor }

    return (
      <View style={[styles.header, headerVisible]}></View>
    )
  }

  render() {
    let iOS = utils.isIphoneX ? 82 : 65
    let { _goToLocation, location, user, results1 } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ParallaxScrollView
          ref='parallaxView'
          backgroundColor={colors.primaryColor}
          contentBackgroundColor="#F6F6F6"
          parallaxHeaderHeight={200}
          stickyHeaderHeight={Platform.OS == 'ios' ? iOS : 77}
          renderForeground={() => this._buildForeground(location)}
          renderFixedHeader={this._buildHeader}
          onChangeHeaderVisibility={(visible) => {
            this.setState({ 'headerVisible': visible })
          }}>
          <View elevation={2} style={[styles.container]}>
            {location.details != "" ? <View style={[styles.card, styles.detailsCard]}>
              <Text style={styles.detailsCardDesc}>
                {location.details}
              </Text>
            </View> : null}
            {<FeaturedView _navigateMention={this._navigateMention} featuredWine={{ type: 'region', data: results1 }} />}
            <ZonesImage location={location} />
            <View style={{ marginTop: 10, marginBottom: utils.isIphoneX ? 27 : 10 }}>
              <TouchableOpacity onPress={() => _goToLocation()}
                opacity={0.8} style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryColor, }}>
                <Text style={{ fontSize: 18, fontFamily: 'Raleway-Regular', lineHeight: 18, color: '#FFF', }}>Browse Local Wine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ParallaxScrollView>
      </View>
    )
  }
}

export default Screen(RegionDetails, {
  navigatorStyle: {
    ...NavStyles.tab,
    drawUnderNavBar: true,
    navBarTransparent: true,
    navBarTranslucent: true,
    navBarBackgroundColor: false,
    tabBarHidden: true,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: '#FFF',
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id: 'backs',
    }],
    rightButtons: [],
  }
})