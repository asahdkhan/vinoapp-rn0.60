import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import Spinner from 'react-native-spinkit'
import { INGREDIENTS, TYPE_FOOD, } from 'constants/pairings'
import VideoBox from '../VideoBox'

import styles from './styles'

const PAIRING_LOGO = require('images/pairing.png')

class PairingsView extends React.Component {
  state = {
    ingredient : false,
    foodType   : false,
  }

  constructor(props) {
    super(props)
    this.lang = I18n.locale.substr(0,2)
    INGREDIENTS[this.lang].unshift({ name: this.lang == 'en' ? 'All' : 'Todos', value: '' })
    TYPE_FOOD[this.lang].unshift({ name: this.lang == 'en' ? 'All' : 'Todos', value: '' })
  }

  componentDidMount() {
    this.props.searchPairigns(false, false,)
  }

  _openVideo = (pairing) => {
    const { foodType, ingredient, } = this.state

    this.props.selectPairing(pairing.id)

    setTimeout(() => {
      this.props.navigator.showModal({
        screen: SCREEN_IDS.PAIRING_DETAIL,
        title : pairing.title,
        passProps: {
          pairing : pairing,
          foodType: foodType,
          ingredient: ingredient,
        }
      })
    }, 100)
  }

  _buildVideoList() {
    const { pairings, } = this.props

    return pairings ? pairings.map(pairing => (
      <View key={`pairings-${pairing.id}`} style={{ flex: 0, minWidth: '50%', padding: 2.5, }}>
        <VideoBox
          onPress={ () => { this._openVideo(pairing) }}
          thumb={{ uri: pairing.thumb }}
          height={ 110 } 
        />
      </View>
    )) : []
  }

  _openFilterModal = (type) => {
    const { foodType, ingredient, } = this.state

    this.props.navigator.showModal({
      screen: SCREEN_IDS.PAIRINGS_FILTER,
      passProps: {
        type: type,
        list: type === 'foodTypes' ? TYPE_FOOD[this.lang] : INGREDIENTS[this.lang],
        selected: type === 'foodTypes' ? foodType : ingredient,
        onSelect: this._onSelectFilter
      }
    })
  }

  _onSelectFilter = (type, filter) => {
    if(type === 'foodTypes') {
      this.setState({ foodType: filter, })
    }else {
      this.setState({ ingredient: filter, })
    }

    setTimeout(() => {
      this.props.searchPairigns(
        this.state.foodType.value,
        this.state.ingredient.value,
      )
    }, 500)
  }

  render() {
    const { pairings, loading, } = this.props
    const { foodType, ingredient, } = this.state

    return (
      <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
        <View style={ styles.logoContainer }>
          <Image source={ PAIRING_LOGO } style={{ }} />
        </View>

        <Text style={ styles.title }>{ I18n.t('pairings.find') }</Text>

        <View style={ styles.filtersContainer }>
          <TouchableOpacity
            style={ styles.filterValue }
            onPress={() => this._openFilterModal('foodTypes') }
          >
            <Text style={ styles.filterText }>
              { 
                foodType ? 
                  foodType.name :
                  I18n.t('pairings.type_of_food') 
              }
            </Text>
            <Icon name="ios-arrow-down" size={22} color={'#34a06a'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={ styles.filterValue }
            onPress={() => this._openFilterModal('ingredient') }
          >
            <Text style={ styles.filterText }>
              { 
                ingredient ?
                  ingredient.name:
                  I18n.t('pairings.main_ingredient') }
            </Text>
            <Icon name="ios-arrow-down" size={22} color={'#34a06a'} />
          </TouchableOpacity>
        </View>

        { 
          pairings && pairings.length > 0 ?
            <Text style={ styles.pairingsCount }>
              { I18n.t('pairings.results').replace('{N}', pairings.length) }
            </Text> :
            <Text style={[ styles.pairingsCount, { textAlign: 'center' }]}>
              { I18n.t('pairings.no_results') }
            </Text>
        }

        <View style={ styles.videosContainer }>
          { loading ? 
              <View style={ styles.loadingContainer }>
                <Spinner
                  isVisible={true}
                  size={30}
                  type={'Bounce'}
                  color={colors.primaryColor}
                />
                <Text style={{ marginTop: 10, textAlign: 'center', color: '#777'}}>
                  { I18n.t('loading') }
                </Text>
              </View> :
              this._buildVideoList() 
          }
        </View>
      </ScrollView>
    )
  }
}

export default Screen(PairingsView, {
  title: 'menu.pairings',
  navigatorStyle: NavStyles.tab,
})