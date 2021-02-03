import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';

import VintageCard from 'components/VintageCard'

import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import styles from './styles'
import { colors } from 'theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import expertRecommendation from './constant'


class RecommendWineView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View style={{ marginBottom: 10 }}>
      </View>
    );
  };

  _goToWine = (data) => {
    //type = data ? 'wine' : 'winery'
    this.props._navigateMention('vintage', data)
  }

  componentWillMount() {
    const { expertDetails } = this.props.props
    let index = expertDetails.id - 1
    this.setState(expertRecommendation[index])
  }

  componentDidMount() {
    const { recommendedWineSearch, results, expertDetails } = this.props.props
    let index = expertDetails.id - 1
    let endpoint = 'vintage'
    let query = {
      page: 0,
      limit: 30,
      order: false,
     // filters: { id: '5a3a7fca05561fd70e19d79e' }
    }
    recommendedWineSearch(endpoint, query, expertRecommendation[index])
  }

  _renderHeader = (section, index, isActive, sections) => {
    return (
      <View elevation={2} style={[styles.header, { backgroundColor: isActive ? colors.primaryColor : '#fff' }]}>
        <Text style={[styles.headerText, isActive ? { color: '#fff', fontFamily: 'Raleway-SemiBold' } : { color: '#34404b', fontFamily: 'Raleway-Regular' }]}>{section.label}</Text>
        {isActive ?
          <Icon name='minus' size={22} style={styles.icon} color='#fff' />
          :
          <Icon name='plus' size={22} style={styles.icon} color='#34404b' />
        }
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    const { recommendedWineResults, loading } = this.props.props
    if (loading && recommendedWineResults.length == 0) {
      return (
        <View style={{ minHeight: 120, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            isVisible={true}
            size={30}
            type={'Bounce'}
            color={colors.primaryColor}
          />
          <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
            {I18n.t('loading')}
          </Text>
        </View>
      )
    }
    return (
      <View style={{ marginTop: 10, }}>
        {recommendedWineResults[index] != undefined && <VintageCard recommendWine={true} data={recommendedWineResults[index]} onPress={() => { this._goToWine(recommendedWineResults[index]) }} />}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });

  };

  render() {
    const { results, loading, page, order, searchType } = this.props.props
    return (

      <View>
        <Text style={styles.mainTitle}>Wine Recommendations</Text>
        <Accordion
          sections={this.state.wines}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          underlayColor={colors.primaryColor}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>
    );
  }
}

export default RecommendWineView
//        {recommendedWineResults[index] != undefined && <WineCard data={recommendedWineResults[index]} onPress={() => { this._goToWine(item) }} />}
