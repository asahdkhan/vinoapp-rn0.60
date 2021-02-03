import React from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-spinkit'
import {colors} from 'theme'
import { SCREEN_IDS } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import Screen from 'hocs/ScreenHoc'
import EmptyList from 'components/EmptyList'

import UserCard from 'components/UserCard'
import Loading from 'components/Loading'

import styles from './styles'

class SearchUsersView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
  }

  componentDidMount() {
    const { page, limit } = this.props
    this.props.getUsers('', page, limit)
    this.props.getInfo()
  }

  componentWillReceiveProps(nextProps) {
    // if ((this.props.isLoading && !nextProps.isLoading && 
    //   this.props.profile.following.length != nextProps.profile.following.length) ||
    //   (nextProps.routes.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS' && nextProps.routes.scene.name == 'usersList' )) {

    //   let users = []
    //   if (nextProps.users.length > 0) {
    //     let userList = nextProps.users
    //     _.remove(userList, { id : nextProps.user.accountId })

    //     users = userList.map(user => {
    //       let count = nextProps.profile ? nextProps.profile.following.length : 0
    //       return { ...user, followerCount : count, mainFollower: nextProps.profile.object.id }
    //     })
    //   }
    // }
  }

  componentWillMount() {
    // this.props.dispatch(ProfileActionCreator.getAll())

    // if (_.isEmpty(this.props.profile.object)) {
    //   this.props.dispatch(ProfileActionCreator.getInfo())
    // }
  }

  componentWillUnmount() {
    this.props.clearList()
  }

  _search = () => {
    this.props.getUsers(this.state.searchTerm)
  }

  _clearSearch = () => {
    this.setState({
      searchTerm : ''
    }, () => {
      this.props.getUsers()
    })
  }

  _goToProfile = (profile) => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.USER,
      passProps: {
        id: profile.id,
      }
    })
  }

  _onKeyPress(evt) {
    if(evt.nativeEvent.key == "Enter"){
      this._search()
    }
  }

  _renderItem = ({item}) => {
    let following = this.props.info ? this.props.info.profile.following.filter((user) => user.id === item.id).length : false

    return (
      <UserCard 
        data={ item }
        onPress={ this._goToProfile }
        following={ following }
      />
    )
  }

  _getMore = () => {
    const { page, limit, total, loading, } = this.props
    const hasMore = ((page +1) * limit) < total

    if (!loading && hasMore) {
      this.props.getUsers('', page + 1, limit)
    }
  }

  render() {
    const { loading, data, loadingInfo, page, } = this.props

    let list = data && data.length > 0 ?
      <FlatList
        contentContainerStyle ={ styles.listInner }
        style={ styles.list }
        data={data}
        keyExtractor={u => u.id}
        renderItem={ this._renderItem }
        onEndReached={ this._getMore }
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => (
          loading ?
            <View style={{ minHeight: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                isVisible={true}
                size={30}
                type={'Bounce'}
                color={colors.primaryColor}
              /> 
            </View> : null
        )}
      /> :
      
      <EmptyList message={ 'Nothing yet. Go for it!' } />

    return (
      <View style={ styles.viewContainer }>
        <View style={ styles.header }>
          <View style={styles.searchField}>
            <TextInput
              value={ this.state.searchTerm}
              underlineColorAndroid={ 'rgba(0,0,0,0)'}
              style={ styles.input }
              onChangeText={(value) =>{ this.setState({ searchTerm: value })}}
              placeholder={ I18n.t('menu.search') }
              placeholderTextColor={ colors.greyMatterhorn }
              autoCapitalize={ 'none' }
              onKeyPress={ this._onKeyPress } 
              onSubmitEditing={ this._search }/>

            <TouchableOpacity style={ styles.searchIcon } onPress={ this._search }>
              <Icon name="md-search" size={19} color={'#FFF'} />
            </TouchableOpacity>

            {
              this.state.searchTerm ?
                <TouchableOpacity style={ styles.btnClearSearch } onPress={ this._clearSearch }>
                  <Text style={ styles.btnClearSearchText }>{ I18n.t('clear') }</Text>
                </TouchableOpacity> : null
            }
          </View>
        </View>

        { 
          ((loading && page === 0) || !data || loadingInfo) ?
            <Loading /> : list
        }
      </View>
    )
  }
}

export default Screen(SearchUsersView, {
  title: '',
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    navBarNoBorder: true,
    topBarElevationShadowEnabled:false,
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
