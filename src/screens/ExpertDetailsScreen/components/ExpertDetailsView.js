import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import { colors } from 'theme';
import { styles } from './styles.js';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import WineRecommendations from './WineRecommendations'
import { SCREEN_IDS, } from 'screens'

const backgroundImg = require('images/explore/featuredCard.jpg')

class ExpertDetailsView extends React.Component {
  constructor(props) {
    super(props);
    expertDetailsComponent = this;
    expertData = '';
  }

  componentWillMount() {
    expertData = expertDetailsComponent.props.expertDetails;
  }

  /* _navigateMention = (type, object) => {
    if (type === 'wine') {
      this.props.navigator.push({
        screen: SCREEN_IDS.WINE,
        title: object.name,
        passProps: {
          id: object.id,
          wine: object,
        }
      })
    }
  } */

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

  render() {
    return (

      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View style={styles.expertDetailsBackground}>
          <ImageBackground resizeMode='cover' source={backgroundImg} style={styles.expertImageBackgroundContainer}  >
          </ImageBackground>
          <ImageBackground source={expertDetailsComponent.props.expertImage} style={styles.expertImageContainer}  >
          </ImageBackground>
          <Text style={styles.expertprofileName}>{expertData.firstName + " " + expertData.lastName}</Text>
        </View>
        <View elevation={2} style={styles.aboutExpertViewContainer}>
          <Text style={styles.expertText}>{I18n.t('expert.about') + " " + expertData.firstName}</Text>
          <View style={styles.expertShortInfoContainer}>
            <Text style={styles.expertAgeAndCityText}>{expertData.city}</Text>
            <Text style={styles.expertAgeAndCityText}>{"   |   "}</Text>
            {
              expertData.age &&
              <Text style={styles.expertAgeAndCityText}>{expertData.age + " " + I18n.t('expert.years_old')}
                <Text style={styles.expertAgeAndCityText}>{"   |   "}</Text>
              </Text>
            }
            <Text style={styles.expertAgeAndCityText}>{expertData.profession}</Text>
          </View>
          <Text style={styles.expertMoreInfoText}>{expertData.more_info}</Text>
          {!undefined &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.expertMoreInfoText, { paddingTop: 0, }]}>Blog: </Text>
              <Text style={[styles.expertMoreInfoText, { paddingTop: 0, color: 'blue' }]}
                onPress={() => Linking.openURL('https://' + expertData.bioLink)}>
                {expertData.bioLink}
              </Text>
            </View>
          }
          {expertDetailsComponent.renderSocialLinksView()}
        </View>
        <WineRecommendations _navigateMention={this._navigateMention} props={this.props} />
      </ScrollView>
    )
  }

  renderSocialLinksView() {
    if (expertData.twitterLink == undefined && expertData.instagramLink == undefined && expertData.facebookLink == undefined) {
      return null
    }
    else {
      return (
        <View>
          <View style={styles.horizontalLine}>
          </View>
          <View style={styles.socialLinksContainer}>
            {expertDetailsComponent.renderFacebookButton()}
            {expertDetailsComponent.renderInstagramButton()}
            {expertDetailsComponent.renderTwitterButton()}
          </View>
        </View>
      )
    }
  }

  renderInstagramButton() {
    if (expertData.instagramLink !== undefined) {
      return (
        <TouchableOpacity style={styles.socialLinksButton} onPress={() => expertDetailsComponent.onPressSocailProfileButton(expertData.instagramLink)}>
          <Icon name="instagram" color={colors.primaryColor} size={28} />
        </TouchableOpacity>
      )
    }
    else {
      return null
    }
  }
  renderTwitterButton() {
    if (expertData.twitterLink !== undefined) {
      return (
        <TouchableOpacity style={styles.socialLinksButton} onPress={() => expertDetailsComponent.onPressSocailProfileButton(expertData.twitterLink)}>
          <Icon name="twitter-square" color={colors.primaryColor} size={28} />
        </TouchableOpacity>
      )
    }
    else {
      return null
    }
  }
  renderFacebookButton() {
    if (expertData.facebookLink !== undefined) {
      return (
        <TouchableOpacity style={styles.socialLinksButton} onPress={() => expertDetailsComponent.onPressSocailProfileButton(expertData.facebookLink)}>
          <Icon name="facebook-square" color={colors.primaryColor} size={28} />
        </TouchableOpacity>
      )
    }
    else {
      return null
    }
  }

  onPressSocailProfileButton(socailProfileLink) {
    Linking.openURL(socailProfileLink)
  }

}

export default Screen(ExpertDetailsView, {
  title: 'expert.expert',
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
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