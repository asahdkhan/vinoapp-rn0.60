import React from 'react'
import _ from 'lodash'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import WineCard from 'components/WineCard'
import Pagination from 'components/Pagination'
import VintageCard from 'components/VintageCard'
import SortModal from '../SortModal'


import styles from './styles'

class SearchResultsView extends React.Component {
  state = {
    sortModalOpen: false,
    limit: 20,
  }

  constructor(props) {
    super(props)
    const buttons = {
      leftButtons: [{
        icon: 'vback',
        type: 'custom',
        id: 'backs',
      }],
      rightButtons: [{
        icon: 'md-funnel',
        type: 'custom',
        id: 'sort',
      }],
    }

    if (props.searchType === 'vintage') {

    } else {

    }

    props.setNavButtons(buttons)
  }

  onNavigationEvent(event) {
    if (event.id === 'sort') {
      this.setState({ sortModalOpen: true, })
    }
  }

  componentDidMount() {
    const { searchData, searchType, } = this.props
    let endpoint = 'wine'

    const defaultOrder = searchType === 'vintage' ? { rate: 'desc' } : { averageScore: 'desc' }

    let query = {
      page: 0,
      limit: this.state.limit,
      //order: searchData.order ? searchData.order : defaultOrder,
      order: false,
      filters: searchData.filters ? searchData.filters : {}
    }

    if (searchType === 'vintage') {
      endpoint = 'vintage'
    }

    if (searchData.query) {
      query = {
        ...query,
        query: searchData.query ? searchData.query : false,
      }
    }

    if (searchData.filters) {
      query = {
        ...query,
        filters: searchData.filters,
      }
    }

    this.props.search(endpoint, query)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  _goToWine = (wine) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      }
    })
  }

  _goToVintage = (vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      //title: `${vintage.year} - ${vintage.wine.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  _renderItem = ({ item, }) => {
    if (this.props.searchType === 'vintage') {
      return <VintageCard data={item} onPress={() => { this._goToVintage(item) }} />
    } else {
      return (
        <WineCard data={item} onPress={() => { this._goToWine(item) }} />
      )
    }
  }

  _renderHeader = () => {
    const { total = 0 } = this.props

    return (
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}></Text>
        <Text style={styles.counter}>
          {total} Results
        </Text>
      </View>
    )
  }

  _goToPage = (page) => {
    const { searchData, searchType, total, loading, order, } = this.props
    let endpoint = 'wine'

    if (!loading) {
      const defaultOrder = searchType === 'vintage' ? { rate: 'desc' } : { averageScore: 'desc' }
      let query = {
        page,
        limit: this.state.limit,
        order: order ? order : defaultOrder,
      }

      if (searchType === 'vintage') {
        endpoint = 'vintage'
      }

      if (searchData.query) {
        query = {
          ...query,
          query: searchData.query ? searchData.query : false,
        }
      }

      if (searchData.filters) {
        query = {
          ...query,
          filters: searchData.filters,
        }
      }

      this.props.search(endpoint, query)
    }
  }

  _onSort = (order) => {
    const { searchData, searchType } = this.props
    let endpoint = 'wine'

    let query = {
      page: 0,
      limit: this.state.limit,
      order: order ? order : false,
      filters: searchData.filters ? searchData.filters : {}
    }

    if (searchType === 'vintage') {
      endpoint = 'vintage'
    }

    if (searchData.query) {
      query = {
        ...query,
        query: searchData.query ? searchData.query : false,
      }
    }

    if (searchData.filters) {
      query = {
        ...query,
        filters: searchData.filters,
      }
    }

    this.setState({ sortModalOpen: false, })
    this.props.search(endpoint, query)
  }

  render() {
    const { sortModalOpen, } = this.state
    const { results, loading, page, order, searchType, pages } = this.props

    return (
      <View style={{ flex: 1, }}>
        <Pagination setLimit={(limit) => this.setState({ limit }, () => this._goToPage(0))} _goToPage={this._goToPage} data={this.props} />
        {!loading ? <FlatList
          data={results}
          keyExtractor={o => o.id}
          renderItem={this._renderItem} sty
          ListHeaderComponent={this._renderHeader()}
        /> : <View style={{ minHeight: 120, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
              isVisible={true}
              size={30}
              type={'Bounce'}
              color={colors.primaryColor}
            />
            <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
              {I18n.t('loading')}
            </Text>
          </View>}

        <SortModal
          open={sortModalOpen}
          type={searchType === 'vintage' ? 'vintage' : 'wine'}
          onClose={() => this.setState({ sortModalOpen: false })}
          onSearch={this._onSort}
          order={order}
        />
      </View>
    )
  }
}

export default Screen(SearchResultsView, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: '#F5F5F5',
  },
})
