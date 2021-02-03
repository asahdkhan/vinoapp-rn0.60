import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import { SCREEN_IDS } from 'screens'

import EmptyList from 'components/EmptyList'
import UserCard from 'components/UserCard'

import styles from './styles'

class MyUsersView extends React.Component {

  componentWillMount() {
    this.props.setNavButtons({
      leftButtons: [{
        icon: 'vback',
        type: 'custom',
        id  : 'backs',
      }],
      rightButtons: [],
    })
    //   let users = []
    //   if (this.props.profile[this.props.listType].length > 0) {
    //     let userList = this.props.profile[this.props.listType]
    //     _.remove(userList, { id : this.props.user.accountId })

    //     users = userList.map(user => {
    //       let count = this.props.profile ? this.props.profile.following.length : 0
    //       return { ...user, followerCount : count, mainFollower: this.props.profile.object.id }
    //     })
    //   }

    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(_.clone(users)),
    //   })

    // if (_.isEmpty(this.props.profile.object)) {
    //   this.props.dispatch(ProfileActionCreator.getInfo())
    // }
  }

  _goToProfile = (profile) => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.USER,
      passProps: {
        id: profile.id,
      }
    })
  }

  render() {
    const { users } = this.props
    
    let list = users && users.length > 0 ?
      <FlatList
        data={ users }
        keyExtractor={u => u.id}
        style={ styles.list }
        renderItem={({item}) => <UserCard data={ item } onPress={ this._goToProfile } />}
      /> :
      <EmptyList message={ 'Nothing yet. Go for it!' } />

    return (
      <View style={ styles.viewContainer }>
        { list }
      </View>
    )
  }
}

export default Screen(MyUsersView, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: '#F5F5F5', 
  },
})