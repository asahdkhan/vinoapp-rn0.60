import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Lightbox from 'react-native-lightbox'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import RateCard from 'screens/FeedScreen - old/components/RateCard'
import MentionCard from 'screens/FeedScreen - old/components/MentionCard'
import FollowCard from 'screens/FeedScreen - old/components/FollowCard'
import Loading from 'components/Loading'
import { SCREEN_IDS } from 'screens'

const { width } = Dimensions.get('window')

import styles from './styles'

class UserView extends React.Component {

  state = {
    following: false
  }

  componentDidMount() {
    this.props.getDetail(this.props.id, { populate: 'rates,user,following,followers'})
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.user && nextProps.user)) {
      
      const following = !!_.find(nextProps.profileExtra.following, (following) => following.id == nextProps.user.id)

      this.setState({
        following,
      })
    }

    if (this.props.loadingFollow && !nextProps.loadingFollow) {
      this.setState({
        following: !this.state.following
      })
    }
  }

  componentWillUnmount() {
    this.props.clearUser()
  }
  

  _getLocation = () => {
    if(this.props.user && this.props.user.location) {
      let locationArr = this.props.user.location.split(',');
      return locationArr[0]+ ', ' + locationArr[locationArr.length - 1];
    } 

    return '';
  }

  _openWine = (type, wine) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      }
    })
  }

  _onFollow(following) {
    if (!this.props.loadingFollow) {
      this.props.setFollower(this.props.user.id, following)
    }
  }

  _renderItem = ({ item, index }) => {
    switch(item.action) {
      case 'RATE': {
        if (!item.target.wine) {
          return <View key={'empty-' + index}/>
        }
        return <RateCard object={ item }  onPress={ this._openWine } />
      }
      case 'COMMENT': return (<View />);
      case 'MENTION': return <MentionCard object={ item } />
      case 'FOLLOWS': return (<FollowCard object={ item } />)
      case 'INFO': return (
        <View style={[ styles.card, { minHeight: 100 }]} elevation={3}>
          <Text style={ styles.infoTitle }>{ I18n.t('profile.about')} { item.user.name.split(' ')[0] }</Text>
          <Text style={ styles.infoText}>{ item.user.info }</Text>
        </View>
      )

      default: 
        return <View key={'empty-' + index}/>
    }
  }

  _getKey = (object) => {
    if (object.target) {
      return object.target.id
    } else {
      return object.id
    }
  }

  render() {
   const { loading, user, loadingFollow, } = this.props
   const { following } = this.state

    if (this.props.loading || !this.props.user) {
      return <Loading />
    }

    let feed = user.feed

    if (user.info) {
      feed = [
        { action: 'INFO', user: user, id: '001', },
        ...feed
      ]
    }

    const imageWidth = width - 30
    const left = (width - imageWidth) / 2

    return (
      <View style={{ flex: 1, backgroundColor: '#F2F2F2'}}>
        <View style={ styles.headerContainer  }>
          <View style={ styles.profileInfo }>
          <Lightbox 
            activeProps={{
              borderRadius: 0,
              width: imageWidth,
              height: imageWidth,
              marginLeft: left,
              padding: 15,
            }}
          >
            <View style={ styles.avatarContainer }>
              { 
                user.photo ?
                  <Image 
                    source={{ uri: user.photo }} 
                    style={{ width: '100%', height: '100%', }} /> 
                : null
              }
            </View>
          </Lightbox>
            <View style={ styles.usernameContainer }>
              <Text style={ styles.username }>{ user.name }</Text>
              <Text style={ styles.location }>{ this._getLocation() }</Text>
              <View style={{ marginTop: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                {
                  following ?
                  <TouchableOpacity style={ styles.followButton } onPress={() => this._onFollow(true) }>
                    { 
                      loadingFollow ?
                        <Text style={ styles.followText }>{ I18n.t('loading')}</Text>:
                        <Text style={ styles.followText }>{ I18n.t('profile.stop_following')}</Text>
                    }
                  </TouchableOpacity>:
                  <TouchableOpacity style={ styles.followButton } onPress={() => this._onFollow(false) }>
                    { 
                      loadingFollow ?
                        <Text style={ styles.followText }>{ I18n.t('loading')}</Text>:
                        <Text style={ styles.followText }>{ I18n.t('profile.follow')}</Text>
                    }
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
          

          <View style={{ height: 45, backgroundColor: '#237E50', flexDirection: 'row' }}>
            <View style={ styles.countersButton }>
              <Text style={ styles.counterValue }>
                { (user) ? user.followers.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.followers').toUpperCase() }</Text>
            </View>

            <View style={[ styles.countersButton, styles.counterButtonCenter ]} >
              <Text style={ styles.counterValue }>
                { (user) ? user.following.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.following').toUpperCase() }</Text>
            </View>

            <View style={ styles.countersButton }>
              <Text style={ styles.counterValue }>
                { (user) ? user.rates.length : '-' }
              </Text>
              <Text style={ styles.counterLabel }>{ I18n.t('profile.ratings').toUpperCase() }</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={ feed }
          keyExtractor={ this._getKey }
          renderItem={ this._renderItem }
        />
      </View>
    )
  }
}

export default Screen(UserView, {
  title: '',
  navigatorStyle: {
    ...NavStyles.tab,
    drawUnderNavBar  : true,
    navBarTransparent: true,
    navBarTranslucent: true,
    topBarElevationShadowEnabled:false,
  },
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id  : 'close',
    }],
    rightButtons: [],
  }
})
