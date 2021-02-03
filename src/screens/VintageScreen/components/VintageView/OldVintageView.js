import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions, Image, Modal, Platform, TextInput } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import config from 'react-native-config'
import Screen from 'hocs/ScreenHoc'
import PieChart from 'react-native-pie-chart'
import { SCREEN_IDS } from 'screens'
import CommentViewContainer from 'components/CommentViewContainer'
import { colors, } from 'theme'
import NavStyles from 'theme/NavigatorStyles'
import Button from 'components/Button'
import RaitingBar from 'components/RaitingBar'
import VideoBox from 'components/VideoBox'
import PersonalityIcon from 'components/PersonalityIcon'
import CommentsList from 'components/CommentsList'
import IntensityWheel from 'components/IntensityWheel'
import MainAromaIcon from 'components/MainAromaIcon'
import WineVintages from 'components/WineVintagesList'
import Loading from 'components/Loading'
import RateModal from '../RateModal'

//import VectorIcons from 'theme/VectorIcons'
import { utils } from 'theme'

import { PersonalitiesNames } from 'constants/personalities'

//import BadgeIcon from '../../components/badge-icon'

import { VARIETIES_LABELS } from 'constants/varieties'
import STATES from 'constants/states'

const {height, width} = Dimensions.get('window');

const COLORS = [
  '#34a06a',
  '#f5d445',
  '#6d1d61',
  '#1b73a3',
  '#e90f4c',
  '#d58f5f'
]

const BODY_OPTIONS = {
  es: {
    'light': 'Ligero',
    'medium': 'Medio',
    'full': 'Completo'
  },
  en: {
    'light': 'Light',
    'medium': 'Medium',
    'full': 'Full',
  }
}

const FINISH_OPTIONS = {
  en: {
    'short': 'Short',
    'medium': 'Medium',
    'long': 'Long',
  },
  es: {
    'short': 'Corto',
    'medium': 'Medio',
    'long': 'Largo',
  }
}

const DECANTER_OPTIONS = {
  en: {
    'Esencial': 'Esencial',
    'Ideal': 'Ideal',
    'No need': 'No need',
  },

  es: {
    'Esencial': 'Necesario',
    'Ideal': 'Idealmente',
    'No need': 'No hace falta',
  }
}

const IC_ANALYSIS = require('images/ic-analysis.png')
const IC_PRODUCTION = require('images/ic-production.png')
const TASTING_NOTE_IMG = require('images/group8.png')
const GENERIC_BOTTLE = require('images/generic_bottle.png')


import styles from './styles'

class VintageView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
      openModal: false,
      commentActive: false,
      rateModalOpen: false,
      temporalRate: 0
    };
  }

  static defaultProps = {
    object: {},
    isLoading: true
  }

  componentDidMount() {
    this.props.getDetail(this.props.id, { populate: 'wine,winery,wishlistOff,userRates'})
    this.props.getComments(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.commentCreated && nextProps.commentCreated) {
      this.setState({ commentActive: false }, () => {
        this.refs.scrollView.scrollTo({x : 0, y: this.state.bottom, animated: true})
      })
    }

    if(!this.props.rateIt && nextProps.rateIt) {
      this.setState({ rateModalOpen: false, temporalRate: 0 });
      this.props.getComments(this.props.id)
    }
  }

  componentWillUnmount() {
    this.props.clearDetail()
  }

  _goToWine = () => {
    const wine = this.props.data.wine

    this.props.navigator.push({
      screen: SCREEN_IDS.WINE,
      title: wine.name,
      passProps: {
        id: wine.id,
        wine: wine,
      }
    })
  }

  _goToWinery = () => {
    this.props.navigator.showModal({
      screen: SCREEN_IDS.WINERY,
      title: this.props.data.winery.name,
      passProps: {
        id: this.props.data.winery.id
      },
    })
  }

  _buildWineMakers() {
    let wineMakersEl = this.props.winery.wineMakers ? this.props.winery.wineMakers.map((wineMaker) => {
      return (
        <VideoBox
          key={ 'winemaker-' + wineMaker.id }
          thumb={{ uri: wineMaker.thumb }}
          width={ width/2 - 15  }
          height={ 100 } />
      )
    }) : []

    return wineMakersEl
  }

  _calculateAgeability = () => {
    let fromYear = Number(this.props.data.year) + Number(this.props.data.wine.ageability);
    let toYear   = Number(this.props.data.year) + Number(this.props.data.wine.ageabilityTo);
    
    return fromYear + '-' + toYear
  }

  _comment = (comment) => {
    this.props.comment(this.props.id, this.props.user.accountId, comment)
  }

  _onLikeComment = (commentId, like) => {
    if (!this.props.token) return
    this.props.likeComment(commentId, this.props.user.accountId, like)
  }

  _rate = (points) => {
    this.setState({
      rateModalOpen: true,
      temporalRate: points
    })
  }

  _onRate = (points, comment) => {
    this.props.rate(this.props.id, points, comment)
  }

  _setWishList = (wishlist) => {
    this.props.setWishlist(this.props.id, wishlist)
  }

  render() {
    const { loading, data, zones, subZones, user } = this.props

    if (loading || !data) {
      return <Loading />
    }

    let varietalComposition = {};
    let varieties = data.varietalComposition ? data.varietalComposition.map((varietie, idx) => {
      varietalComposition = Object.assign({}, varietalComposition, varietie);
      return (
        <View key={Object.keys(varietie)[0]} style={{ flexDirection: 'row', marginBottom: 5}}>
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS[idx], marginRight: 8 }} />
          <Text style={[styles.infoValue, {fontSize: 11} ]}>
            { _.capitalize(VARIETIES_LABELS[Object.keys(varietie)[0]]) }
          </Text>
        </View>
      )
    }) : [];

    let varietalCompositionValues = Object.values(varietalComposition).map(v => { return Number(v)}) ;
    if (varietalCompositionValues.length == 1) {
      varietalCompositionValues.push(0.1);
    }

    let averageScore = 0;

    let isInWishList = this.props.user ?
      _.find(data.wishlistOff, (wishlist) => { return this.props.user.accountId === wishlist.id }) :
      false

    let isReatedByMe = this.props.user ? _.find(data.userRates, (rate) => { return this.props.user.accountId === rate.user }) : false

    let raiting = _.reduce(data.userRates, (sum, n) => {
      return sum + n.points;
    }, 0);

    if (data.userRates.length > 0) {
      raiting = Math.round((raiting / data.userRates.length) * 100) / 100  ;
    }

    let province = data.winery.state ? _.find(STATES, { id: data.winery.state }) : {}
    let zone     = data.wine.zone  ? _.find(zones, { id: data.wine.zone }) : {}
    let subZone  = data.wine.subZone  ? _.find(subZones, { id: data.wine.subZone }) : {}

    let lang = I18n.locale.substr(0,2)

    return (
      <View style={ styles.viewContainer }>
        <CommentViewContainer
          offset={ Platform.OS === 'ios' ? 65 : 85 }
          active={ this.state.commentActive } 
          onClose={() => { this.setState({commentActive: false}); }}
          onComment={ this._comment.bind(this) }>
          <ScrollView ref="scrollView">
            <View style={[ styles.card, styles.infoCard ]}>
              <View style={ styles.generalInfoContainer }>
                { data.frontLabel ?
                  <View style={{ width: 90, flex: 0, height: 165, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Image
                      resizeMode={'contain'} 
                      source={{ uri : config.MEDIA_BASE + data.frontLabel }}
                      style={{ height: 165, width: 90 }}
                      height={165}
                      width={90} />
                  </View>:
                  <Image 
                    source={ GENERIC_BOTTLE }
                    style={{ height: 180, width: 48 }}
                    height={180}
                    width={48} />
                }
                <View key="general-info" style={ styles.generalInfo}>
                  <Text style={ styles.generalInfoTitle }>{I18n.t('wine.vintage_info')}</Text>
                  <View style={ styles.generalInfoItem}>
                    <Text style={ styles.infoLabel }>{I18n.t('wine.winery') }</Text>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={ styles.infoValue }>{ data.winery.name }</Text>
                  </View>

                  <View style={ styles.generalInfoItem}>
                    <Text style={ styles.infoLabel }>{ I18n.t('wine.wine') }</Text>
                    <TouchableOpacity onPress={ this._goToWine } style={{ flex: 1, flexDirection: 'row'}}>
                      <Text ellipsizeMode={'tail'} numberOfLines={1} style={[ styles.infoValue, { color: colors.primaryColor, textDecorationLine: 'underline', width: 0, flex: 1, } ]}>{ data.wine.name }
                      </Text>
                    </TouchableOpacity>
                  </View> 

                  <View style={ styles.generalInfoItem}>
                    <Text style={ styles.infoLabel }>{ _.capitalize(I18n.t('wine.year')) }</Text>
                    <Text style={ styles.infoValue }>{ data.year }</Text>
                  </View>

                  <View style={ styles.generalInfoItem}>
                    <Text style={ styles.infoLabel }>{ I18n.t('wine.province') }</Text>
                    <Text style={ styles.infoValue }>
                      { province ? province.name : '-' }
                    </Text>
                  </View>

                  {
                    !data.userSuggestion && 
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.zone') }</Text>
                        <Text style={ styles.infoValue }>
                          { zone.name ? zone.name : '-' }
                        </Text>
                      </View>
                  }

                  {
                    !data.userSuggestion && 
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.sub_zone') }</Text>
                        <Text style={ styles.infoValue }>
                          { subZone ? subZone.name : '-' }
                        </Text>
                      </View>
                  }

                  {
                    !data.userSuggestion && 
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.type') }</Text>
                        <Text style={ styles.infoValue }>
                          { _.capitalize(data.wine.type) } Wine
                        </Text>
                      </View>
                  }
                  
                  {
                    !data.userSuggestion && 
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.elevation') }</Text>
                        <Text style={ styles.infoValue }>{ data.wine.elevation } { I18n.t('wine.feets') }</Text>
                      </View>
                  }

                  {
                    !data.userSuggestion && 
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.price') }</Text>
                        <Text style={ styles.infoValue }>{ data.suggestedPrice }USD</Text>
                      </View>
                  }

                  {
                    !data.userSuggestion &&
                      <View style={ styles.generalInfoItem}>
                        <Text style={ styles.infoLabel }>{ I18n.t('wine.varieties') }</Text>
                      </View>
                  }

                  {
                    !data.userSuggestion &&
                      <View style={ styles.generalInfoItem}>
                         <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                          <PieChart
                            chart_wh={68}
                            series={varietalCompositionValues}
                            sliceColor={COLORS}
                            doughnut={true}
                            coverRadius={0.85}
                            coverFill={'#FFF'}
                          />
                          <View style={{ width: 56, height: 56, backgroundColor: '#FFF', position: 'absolute', borderRadius: 80, left: 6, top: 6}} />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1, marginTop: 5 }}>
                          { varieties }
                        </View>
                      </View>

                  }

                  {
                    data.userSuggestion &&
                     <View style={{ borderWidth: 1, borderColor: '#34404c', marginBottom: 15, paddingVertical: 5, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={'md-contact'} size={32} color={colors.primaryColor} />
                        <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 14, marginLeft: 15, color: '#444' }}>{ I18n.t('wine.user_suggestion') }</Text>
                     </View>
                      
                  }
                </View>
              </View>

              { /* 
                !data.userSuggestion &&
                  <View style={ styles.badgesContainer }>
                    {
                      data.personality && data.personality.map(personality => {
                        return <PersonalityIcon name={ personality } key={ personality } width={ 48 } height={ 48 } />
                      })
                    }


                    {
                      //BadgeIconComponent
                      data.badges && data.badges.map(badge => {
                        return <BadgeIcon key={ badge.id } icon={ badge.image } width={ 48 } height={ 48 } />
                      })
                    }
                  </View> */
              }
            </View>

            { /* Vino App Rate  */ }
            {
              !data.userSuggestion &&
                <View key='rate' style={[ styles.card, { marginTop: 5, minHeight: 240 } ]}>
                  <View style={styles.rateContainer}>
                      <View style={ styles.rate }>
                        <Text style={ styles.rateValue }>{ data.rate }</Text>
                        <Text style={ styles.rateString }>VinoApp Rate</Text>
                      </View>

                    <View style={{ flex: 1, paddingBottom: 5, }}>
                      <View style={ styles.mainAromas}>
                        <Text style={ styles.aromasTitle }>{I18n.t('wine.main_aromas')}</Text>
                        { _.isArray(data.mainAromas) &&
                        <View style={ styles.aromasList }>
                          <MainAromaIcon name={ data.mainAromas[0] } count={ 1 } style={{borderLeftWidth: 0}} />
                          <MainAromaIcon name={ data.mainAromas[1] } count={ 2 } />
                          <MainAromaIcon name={ data.mainAromas[2] } count={ 3 } style={{borderRightWidth: 0}} />
                        </View>
                        }
                      </View>

                        <View style={ styles.intensityWheelTitleContainer }>
                          <Text style={ styles.intensityWheelTitle }>{ I18n.t('wine.intensity_wheel') }</Text>
                          <TouchableOpacity onPress={()=> { this.setState({ openModal: true })}} style={{ width: 20, height: 20, position: 'absolute', right: 10, top: 0, marginTop: 0,flex: 1, zIndex: 200 }}>
                            <Icon name="md-help-circle" size={18} color={ colors.primaryColor }/> 
                          </TouchableOpacity>
                        </View>
                          
                        <View style={{flexDirection: 'row'}}>
                          <View style={styles.notes }>
                            <View style={ styles.noteItem }>
                              <View style={[ styles.notePoint, { backgroundColor: '#e90f4c' } ]} />
                              <Text style={ styles.noteName }>{I18n.t('wine.acidity')}</Text>
                            </View>

                            <View style={ styles.noteItem }>
                              <View style={[ styles.notePoint, { backgroundColor: '#6d1d61' } ]} />
                              <Text style={ styles.noteName }>{I18n.t('wine.aroma')}</Text>
                            </View>

                            <View style={ styles.noteItem }>
                              <View style={[ styles.notePoint, { backgroundColor: '#1b73a3' } ]} />
                              <Text style={ styles.noteName }>{I18n.t('wine.spice')}</Text>
                            </View>

                            <View style={ styles.noteItem }>
                              <View style={[ styles.notePoint, { backgroundColor: '#50ba4a' } ]} />
                              <Text style={ styles.noteName }>{I18n.t('wine.fruit')}</Text>
                            </View>

                            <View style={ styles.noteItem }>
                              <View style={[ styles.notePoint, { backgroundColor: '#d58f5f' } ]} />
                              <Text style={ styles.noteName }>{I18n.t('wine.wood')}</Text>
                            </View>
                          </View>

                          <View style={ styles.intensityWheelContainer }>
                            <IntensityWheel width={100} height={100} values={ data.intensity } />
                          </View>
                        </View>                      
                    </View>
                  </View>
                </View>
            }

            {
              data.userSuggestion &&
              <View style={[ styles.card, { marginTop: 30, padding: 15, }]} elevation={1}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <View style={{ justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row' }}>
                    <Icon name={'md-contact'} size={48} color={ colors.primaryColor } />
                    <View>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, marginLeft: 15, marginBottom: 5, color: '#444' }}>{I18n.t('wine.user_suggestion')}</Text>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 12, marginLeft: 15, color: '#34404c' }}>
                        { I18n.t('wine.user_suggestion_txt') }
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            }


            { user ? (
              !data.userSuggestion &&
                <View style={ styles.actions }>
                { this.props.token &&
                  <TouchableOpacity 
                    style={[ styles.actionsButton, styles.card, {backgroundColor: colors.primaryColor } ]} 
                    onPress={() => { this._setWishList(!isInWishList) }}>
                    <utils.bookmarkIcon size={24}/>
                    { isInWishList ? 
                      <Text style={ styles.actionsButtonText }>{ I18n.t('wine.remove_from_whislist') }</Text>:
                      <Text style={ styles.actionsButtonText }>{ I18n.t('wine.add_to_wishlist') }</Text>
                    }
                  </TouchableOpacity>
                }
                </View>
               ) : <View style={{ marginTop: 30 }}></View>
            }


            {/* Tasting Notes */}
            {
              !data.userSuggestion &&
                <View style={[ styles.card, { paddingLeft: 15, paddingRight: 15, flexDirection: 'row', paddingTop: 10, paddingBottom: 15, } ]}>
                  <Image source={ TASTING_NOTE_IMG } />
                  <View style={{ flex: 1, paddingLeft: 15, paddingTop: 5}}>
                    <Text style={{ fontSize:16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 5}}>{ I18n.t('wine.tasting_note') }</Text>
                    <Text style={{ fontSize: 12, color: '#34404c', fontFamily: 'Raleway-Regular'}}>{ data.tastingNote && (I18n.locale == 'en' ? data.tastingNote : data.tastingNoteEs) }</Text>
                  </View>
                </View>
            }

            {/* Info */}
            {
              !data.userSuggestion &&
                <View key='info' style={[ styles.card, styles.infoContainer ]}>
                  <Text style={ styles.vintagesTitle }>Wine general info</Text>
                  <View style={ styles.infoRow }>
                    <View style={[ styles.infoCol, { borderRightWidth: 1, borderColor: '#34404c', paddingRight: 5, marginRight: 15 }]}>
                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.body') }</Text>
                        <Text style={ styles.infoValue}>
                          { 
                            BODY_OPTIONS[lang][data.body]
                          }
                        </Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.sweetness') }</Text>
                        <Text style={ styles.infoValue}>{ _.capitalize(data.wine.sweetness) }</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.finish') }</Text>
                        <Text style={ styles.infoValue}>
                          { FINISH_OPTIONS[lang][data.finish] }
                        </Text>
                      </View>
                    </View>

                    <View style={ styles.infoCol }>
                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84, marginRight: 5} ]}>{ I18n.t('wine.ageability') }</Text>
                        <Text style={ styles.infoValue}>{ this._calculateAgeability() }</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84, marginRight: 5} ]}>{ I18n.t('wine.serving_temp') }</Text>
                        <Text style={ styles.infoValue}>{ data.wine.servingTemp }ºC</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84, marginRight: 5} ]}>{ I18n.t('wine.decanter') }</Text>
                        <Text style={ styles.infoValue}>
                          { 
                            DECANTER_OPTIONS[lang][data.decanter]
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
            }

            {/* Info */}
            {
              !data.userSuggestion &&
                <View key='info-2' style={[ styles.card, styles.infoContainer ]}>
                  <View style={ styles.infoRow }>
                    <View style={[ styles.infoCol, { borderRightWidth: 1, borderColor: '#34404c', paddingLeft: 5, marginRight: 15 }]}>
                      <View style={[ { flex: 1,flexDirection: 'row', height: 30} ]}>
                        <Text style={[ styles.vintagesTitle, { flex:0, width: 100}]}>{ I18n.t('wine.analysis') }</Text>
                      </View>
                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>Alcohol</Text>
                        <Text style={ styles.infoValue}>{ data.alcohol }%</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>PH</Text>
                        <Text style={ styles.infoValue}>{ data.ph }</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.acidity') }</Text>
                        <Text style={ styles.infoValue}>{ _.capitalize(data.acidity ) }</Text>
                      </View>
                    </View>

                    <View style={ styles.infoCol }>
                      <View style={[ { flex: 0,flexDirection: 'row'} ]}>
                        <Text style={[ styles.vintagesTitle, { flex: 0, width: 100}]} >{ I18n.t('wine.production') }</Text>
                      </View>
                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.cases') }</Text>
                        <Text style={ styles.infoValue}>{ data.cases_9l } M</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.aging') }</Text>
                        <Text style={ styles.infoValue}>{ data.barrelAging } months</Text>
                      </View>

                      <View style={ styles.infoItem }>
                        <Text style={[ styles.infoLabel, { width: 84} ]}>{ I18n.t('wine.oak') }</Text>
                        <Text style={ styles.infoValue}>{ _.capitalize(data.oak) }</Text>
                      </View>
                    </View>
                  </View>
                </View>
            }

            {/* WineryAccess */}
            <View style={[ styles.card, { marginTop: 30, padding: 20 } ]} elevation={1}>
              <Text style={{ fontSize: 16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 15, textAlign: 'center' }}>{this.props.data.winery.name}</Text>
              <Button
                label={ I18n.t('wine.view_winery') }
                onPress={ this._goToWinery }
                style={{ marginLeft: 60, marginRight: 60, height: 36}}
                rounded
              />
            </View>

            {/* WineMaker */}
            {/*}
            <View key='winemaker' style={ styles.wineMakersContainer }>
              <Text style={ styles.wineMakerTitle }>Winemakers Voice</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                { this._buildWineMakers() }
              </View>
            </View>
            */}

            { /* Pairings */ }
            {/*
            <View key='pairings' style={ styles.pairingsContainer }>
              <Text style={ styles.pairingsTitle }>Some perfect matches with this wine</Text>
              <View style={{ flex: 1, flexDirection:'row', flexWrap: 'wrap', marginLeft: 2.5, marginRight: 2.5}}>
                <VideoBox
                  thumb={{ uri: 'https://i.ytimg.com/vi/X3Uo--FOakw/hqdefault.jpg'}}
                  width={ width/2 - 2.5 }
                  height={ 120 }/>

                <VideoBox
                  thumb={{ uri: 'https://i.ytimg.com/vi/X3Uo--FOakw/hqdefault.jpg'}}
                  width={ width/2 - 2.5 }
                  height={ 120 }/>
              </View>
            </View>
            */}


            {/* Comments Box */}
            <View onLayout={(evt) => { 
                let {height, y} = evt.nativeEvent.layout;
                let pos = y;
                this.setState({'bottom': pos})
              }}>
              <CommentsList 
                title={ I18n.t('article.comments') }
                objectType={'vintage'}
                loading={ this.props.loadingComments } 
                comments={ this.props.comments } 
                showButton={ !this.state.commentActive && this.props.token }
                user={ this.props.user ? this.props.user.accountId : null }
                writeComment={() => { this.setState({ commentActive: true })}} 
                onLikeComment={ this._onLikeComment } />
            </View>
            

            {/* Related Wines 
            <View key="related-wines" style={ styles.relatedWinesContainer }>
              <Text style={ styles.relatedWinesTitle }>Related wines</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#CCC', width: 47, flex: 0, height: 147 }}></View>
                </View>
              </View>
            </View>*/}
          </ScrollView>
        </CommentViewContainer>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.openModal}
          onRequestClose={() => {}}>
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <View style={{ margin: 15, backgroundColor: '#FFF', paddingHorizontal: 25, paddingVertical: 30, borderRadius: 4, }}>
              <Text style={{ fontSize:16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 5, paddingTop: 10, position: 'relative', textAlign: 'center' }}>{ I18n.t('wine.intensity_wheel') }</Text>
              <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 13, color: '#34404c', }}>The Wine Aroma Wheel is an incredible tool to learn about wines and enhance one’s ability to describe the complexity of flavor in red and white wines.{"\n"}
                Initially, most people can’t recognize or describe aromas so the purpose of the wheel is to provide terms to describe wine aromas.{"\n"}
                The wheel has very general terms located in the center (e.g. fruity or spicy), going to the most specific terms in the outer tier (such as strawberry or clove). These terms are NOT the only words that can be used to describe wines, but represent ones that are most often encountered.{"\n"}
                Easy to use and understand, it will enhance your whole wine experience.{"\n"}
              </Text>

              <Button
                onPress={ () => { this.setState({openModal: false}) }}
                style={{ marginLeft: 80, marginRight: 80, height: 30}}
                rounded={true}
                label={ I18n.t('close') }/>  
            </View>
          </View>
        </Modal>

        <RateModal
          open={ this.state.rateModalOpen }
          rate={ this.state.temporalRate } 
          onRate={ this._onRate } 
          onClose={() => this.setState({ rateModalOpen: false, })}
        />
      </View>
    );
  }
}

export default Screen(VintageView, {
  navigatorStyle: {
    ...NavStyles.tab,
    tabBarHidden: true,
    screenBackgroundColor: '#F5F5F5', 
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


//<Image style={[ styles.titleIcon, { width: 20, height: 25, flex: 0} ]} width={20} height={25} source={ IC_PRODUCTION }/>
