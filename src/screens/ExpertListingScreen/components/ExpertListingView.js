import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ListView
} from "react-native";
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import { SCREEN_IDS, } from 'screens'
import expertMetaData from '../ExpertData/ExpertMetaData';
//import ExpertDetailsView from './ExpertDetailsView';
import { colors } from 'theme';
import { styles } from './styles.js';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
const expert1 = require('images/expert/todd_bone.jpg')
const expert2 = require('images/expert/jorge_bourdieu.jpeg')
const expert3 =require('images/expert/guillermo_maguire.jpg')
const expert4 = require('images/expert/nicolas_Orsini.jpg')
const expert5 = require('images/expert/pablo_santos.jpg')




class ExpertListingView extends React.Component {
  constructor(props) {
    super(props);
    expertListingComponent = this;
    ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => true});
    expertListingComponent.state =
      {
        expertDataSource: ds1,
      }
  }

  componentWillMount() {
    var dataToSet = expertMetaData.es_experts
    if (I18n.locale.substr(0, 2) == 'en') {
      dataToSet = expertMetaData.en_experts
    }
    expertListingComponent.setState(
      {
        expertDataSource: ds1.cloneWithRows(dataToSet)
      });
  }

  /*redirectToExpertDetails(expertDetails)
   {
     expertListingComponent.props.navigator.push('ExpertDetailsView',{expertDetails:expertDetails});
   }*/

  redirectToExpertDetails = (expertDetails, profileImg) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.EXPERT_DETAILS,
      title: I18n.t('search.best_rated'),
      passProps: {
        expertDetails: expertDetails,
        expertImage: profileImg,
      }
    })
  }


  _onExpertSelect = (rowData, profileImg) => {
    expertListingComponent.redirectToExpertDetails(rowData, profileImg)
  }

  renderRow(rowData) {
    var profileImg;
    if (rowData.id == "1") {
      profileImg = expert1
    }
    else if (rowData.id == "2") {
      profileImg = expert2
    }
    else if (rowData.id == "3") {
      profileImg = expert3
    }
    else if (rowData.id == "4") {
      profileImg = expert4
    }
    else {
      profileImg = expert5
    }
    return (
      <View elevation={2} style={{ backgroundColor: colors.primaryColor, marginBottom: 10, flex: 1, borderRadius: 8, }}>
        <TouchableOpacity onPress={() => expertListingComponent._onExpertSelect(rowData, profileImg)}>
          <View style={styles.rowExpertInfo}>
            <ImageBackground source={profileImg} style={styles.expertImageContainer}  >
            </ImageBackground>
            <View style={styles.profileDesc}>
              <Text style={styles.profileName}>{rowData.firstName + " " + rowData.lastName}</Text>
              <Text style={styles.profileInfo}>{rowData.city}</Text>
              {rowData.age  && <Text style={styles.profileInfo}>{rowData.age + " " + I18n.t('expert.years_old')}</Text>}
              <Text style={styles.profileInfo}>{rowData.profession}</Text>
            </View>
            <View style={styles.expertListingArrow}>
              <Icon name="ios-arrow-forward" color={colors.primaryColor} size={24} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

    )
  }


  render() {
    return (
      <ScrollView style={styles.scrollviewContainer} contentContainerStyle={styles.scrollviewContainer}>
        <View style={styles.selectExpertView}>
          <Text style={styles.selectExpertText}>{I18n.t('expert.select_expert')}</Text>
        </View>
        <ListView
          dataSource={expertListingComponent.state.expertDataSource}
          renderRow={expertListingComponent.renderRow}
        />
      </ScrollView>
    )
  }
}

export default Screen(ExpertListingView, {
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