import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'components/Button'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import ViewOverflow from 'react-native-view-overflow'
import { colors, } from 'theme'
import Slider from 'components/Slider'
import { SPECIAL_SEARCH_KEYS, SPECIAL_SEARCH_CONFIG, } from 'constants/search'
import VarietiesFilterList from '../VarietiesFilterList'
import MoodsFilterList from '../MoodsFilterList'
import FeaturedFilterList from '../FeaturedFilterList'
import WineriesFilterList from '../WineriesFilterList'

import styles from './styles'


class SpecialSearchView extends React.Component {
  constructor(props) {
    super(props)
    this.locale = I18n.locale.substr(0,2)
    this.filter = SPECIAL_SEARCH_CONFIG[this.locale][this.props.filterType]

    this.state = {
      filter: [],
      isGteActive: false,
      isLteActive: false,
      range: {
        gte: this.filter['min'],
        lte: this.filter['max'],
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.filter = SPECIAL_SEARCH_CONFIG[this.locale][this.props.filterType]
  }

  _openWinery = (winery) => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.WINERY,
      title: winery.name,
      passProps: {
        id: winery.id,
      },
    })
  }

  _changeValue = (value) => {
    this.setState({
      filter: value
    });
  }

  _changeFilter = (value) => {         // price range
    if(this.state.range.gte !== value.gte){
      this.setState({
        isGteActive: true
      })
    }
    if(this.state.range.lte !== value.lte){
      this.setState({
        isLteActive: true
      })
    }

    this.setState({
      range: value,
    });
  }

  _finishFilter = () => {               // price range
    this.setState({
      isGteActive: false,
      isLteActive: false
    })
  }

  _buildFilterControl = () => {
    var deviceWidth = Dimensions.get('window').width

    if (this.filter.type === 'range') {
      return (
        <ViewOverflow style={{ flexDirection: 'column', marginLeft: 5, marginRight: 5, marginBottom: 40 }}>
          <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 40 }}>  
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
              <View elevation={4} style={[ 
                styles.card, 
                this.state.isGteActive ? { borderWidth: 1, borderColor: colors.primaryColor } : {},
                { width: deviceWidth * 0.40, height: deviceWidth * 0.40, justifyContent: 'center', alignItems:'center', backgroundColor: '#FFF', borderRadius: deviceWidth * 0.40/2, } ]}>
                <Text style={[ styles.rangeLabel, { fontSize: deviceWidth * 0.10, } ]}>{ this.state.range.gte }</Text>
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
              <View elevation={4} style={[ 
                styles.card,
                this.state.isLteActive ? { borderWidth: 1, borderColor: colors.primaryColor } : {},
                { width: deviceWidth * 0.40, height: deviceWidth * 0.40, justifyContent: 'center', alignItems:'center', backgroundColor: '#FFF', borderRadius: deviceWidth * 0.40/2, } ]}>
                <Text style={[ styles.rangeLabel, { fontSize: deviceWidth * 0.10, } ]}>{ this.state.range.lte }</Text>
              </View>
            </View> 

          </View> 
          <View elevation={4} style={[ styles.card, { marginTop: 20, paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, width: '100%' } ]}>  
            <Slider 
              hideAnima={true}
              hideLabels={true}
              min={this.filter.min}
              max={this.filter.max}
              division={true}
              //unit={ this.filter.unity }
              value={[ this.state.range.gte , this.state.range.lte ]}
              onChange={(values)=> this._changeFilter({ gte: values[0], lte: values[1]}) }
              onFinish={(values)=> this._finishFilter({ gte: values[0], lte: values[1]}) }
              //step={50}
            />
          </View>
        </ViewOverflow> 
      )
    } else {
      switch(this.props.filterType) {
        case 'varietal':
          return (<VarietiesFilterList style={{ flex: 1 }} changeValue={this._changeValue} />);

        case 'mood':
          return (<MoodsFilterList style={{ flex: 1 }} changeValue={this._changeValue} />);

        case 'cellar': 
          return (
            <WineriesFilterList
              style={{ flex: 1 }}
              changeValue={this._changeValue}
              checkWinery={ this._openWinery }
            />);

        case 'expert':
          return (<FeaturedFilterList style={{ flex: 1}} changeValue={ this._changeValue } />);
      }
    }
  }

  _onSearch = () => {
    let values = this.state.range;
    if (this.filter.type == 'list') {
      values = this.state.filter
    }

    if (values.length == 0) {
      //this.props.dispatch(SystemNotificationActionCreator.send('You must select some item.'));
      return;
    }
    
    this.props.navigator.push({
      screen: SCREEN_IDS.SEARCH_RESULTS,
      passProps: {
        searchData: {
          filters: {
            [SPECIAL_SEARCH_KEYS[this.props.filterType]]: values
          },
          order: SPECIAL_SEARCH_KEYS[this.props.filterType] == 'suggestedPrice' ?  { suggestedPrice : 'desc' }  : false,
        },
        searchType: this.filter.searchType,
      }
    }) 
  }

  render() {
    let unity = this.filter['unity'] != undefined ? `(${this.filter['unity']})` : ''
    return (
      <ScrollView style={ styles.viewContainer }>
        <View style={ styles.helpBox }>
          <Text style={ styles.helpTxt }>{ this.filter['helpText'] }</Text>
        </View>

        <View style={[ styles.filterContainer ]}>
          <Text style={ styles.filterTitle }>
            { `${this.filter['label']} ${ unity }` }
          </Text>
          { this._buildFilterControl() }
        </View>

        <View style={{ alignSelf: 'center', }}>
          <TouchableOpacity onPress={ this._onSearch } activeOpacity={0.8}>
            <View style={ styles.searchBtn }><Text style={ styles.btnLabel }>{ I18n.t('search.search')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default Screen(SpecialSearchView, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id  : 'backs',
    }],
    rightButtons: [],
  }
})
