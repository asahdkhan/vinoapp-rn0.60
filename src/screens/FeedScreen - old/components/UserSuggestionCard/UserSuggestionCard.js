import React from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/Ionicons'
import RaitingBar from 'components/RaitingBar'
import { colors } from 'theme'

import styles from './styles'

class UserSuggestionCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFollowing: props.user ? props.object.target.followers.indexOf(props.user.accountId) > -1 : false
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.object.target.id != nextProps.object.target.id) {
  //     this.state = {
  //       isLoading: false,
  //       isFollowing: nextProps.object.target.followers.indexOf(nextProps.user.accountId) > -1
  //     }
  //   }
  // }

  _getLocation() {
    if(this.props.object.target.location) {
      let locationArr = this.props.object.target.location.split(',');
      return locationArr[0]+ ', ' + locationArr[locationArr.length - 1];
    } 

    return '-'
  }

  _goToProfile(profile) {
    this.props.goToProfile(this.props.object.target)
  }

  _onFollow = () => {
    let isFollowing = this.props.object.target.followers.indexOf(this.props.user.accountId) > -1

    if (!isFollowing) {
      this.props.onFollow(this.props.object.target.id)
    }
  }


  render() {
    const { object, user, loading, } = this.props
    let activeStyle = this.state.isLoading ? {} : { opacity: 1}; 
    let isFollowing = user ? object.target.followers.indexOf(user.accountId) > -1 : false

    return (
      <TouchableOpacity 
        style={[ styles.card, { height: 80 }]}
        elevation={2}
        onPress={ this._goToProfile.bind(this) }
      >
        <View style={[ styles.cardBody, styles.viewContainer ]}>
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <View style={ styles.avatar }>
              { object.target.photo ?
                <View style={{ height:40, width: 40, borderRadius: 40, overflow: 'hidden', }}>
                  <Image source={{ uri : object.target.photo }} width={ 40 } height={ 40 } style={{ height:40, width: 40, }} />
                </View>:
                <Icon name="md-person" size={30} style={{ opacity: 0.7 }} color={'#FFF'} />
              }
            </View>

            <View style={[ styles.infoContainer]}>
              <Text style={ styles.userName }>{ object.target.name }</Text>
              <Text style={ styles.secondaryText }>{ this._getLocation() }</Text>
            </View>
          </View>

          <View style={ styles.extraInfoContainer }>
            <TouchableOpacity style={[ styles.btnFollow, activeStyle ]} onPress={ this._onFollow }>
              {
                loading === object.target.id ?
                  <Spinner
                    isVisible={true}
                    size={30}
                    type={'Bounce'}
                    color={colors.primaryColor}
                  /> :
                  <Text style={ styles.btnFollowText }>{ 
                    isFollowing ? I18n.t('profile.following') : I18n.t('profile.follow') }
                  </Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default UserSuggestionCard
