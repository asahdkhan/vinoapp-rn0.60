import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions, Image, TextInpuModal, Platform, Modal } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from 'theme'
import NavStyles from 'theme/NavigatorStyles'

import CommentViewContainer from 'components/CommentViewContainer'
import Button from 'components/Button'
import RaitingBar from 'components/RaitingBar'

import VideoBox from 'components/VideoBox'
import PersonalityIcon from 'components/PersonalityIcon'
import CommentsList from 'components/CommentsList'
import IntensityWheel from 'components/IntensityWheel'
import MainAromaIcon from 'components/MainAromaIcon'
import WineVintages from 'components/WineVintagesList'
import Loading from 'components/Loading'

import { utils } from 'theme'

import { VARIETIES_LABELS } from 'constants/varieties'
import STATES from 'constants/states'

import styles from './styles'

const { height, width } = Dimensions.get('window')

const COLORS = [
  '#34a06a',
  '#f5d445',
  '#6d1d61',
  '#1b73a3',
  '#e90f4c',
  '#d58f5f'
]

const GENERIC_BOTTLE = require('images/generic_bottle.png')

class WineView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      commentActive: false,
      bottom: 0,
      openModal: false
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data && nextProps.data.id === this.props.id
  }

  componentWillMount() {
    const { id, wine, } = this.props
    this.props.getDetail(id, { populate: 'zone,subZone,vintages,pairings,favoriteOff', })
    this.props.getRelated(wine)
    this.props.getComments(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data && !nextProps.data) {
      this.props.getDetail(this.props.id, { populate: 'zone,subZone,vintages,pairings,favoriteOff', })
      this.props.getRelated(this.props.wine)
      this.props.getComments(this.props.id)
    }


    if (!this.props.commentCreated && nextProps.commentCreated) {
      this.setState({ commentActive: false }, () => {
        this.refs.scrollView.scrollTo({ x: 0, y: this.state.bottom, animated: true })
      })
    }

    if (this.props.loading && !nextProps.loading && nextProps.data) {
      if (nextProps.data.pairings && nextProps.data.pairings.length > 0) {
        this.props.getPairings(nextProps.data.pairings)
      }
    }
  }

  componentWillUnmount() {
    this.props.clearDetail()
  }

  _gotToVintage = (vintage) => {
    this.props.navigator.push({
      screen: SCREEN_IDS.VINTAGE,
      title: `${vintage.year} - ${this.props.data.name}`,
      passProps: {
        id: vintage.id,
        wine: vintage.wine,
      }
    })
  }

  _buildWineMakers = () => {
    let wineMakersEl = this.props.data.winery ?
      this.props.data.winery.wineMakers.map((wineMaker) => {
        return (
          <VideoBox
            onPress={() => {
              this.props.navigator.push({
                screen: SCREEN_IDS.WINE_MAKER,
                title: ``,
                passProps: {
                  wineMaker: wineMaker,
                  wines: [],
                  winery: this.props.data.winery,
                  goToWine: this._goToWine,
                }
              })
            }}
            key={'winemaker-' + wineMaker.id}
            thumb={{ uri: wineMaker.thumb }}
            width={width / 2 - 15}
            height={100} />
        )
      }) : []

    return wineMakersEl
  }


  _comment = (comment) => {
    this.props.comment(this.props.id, this.props.user.accountId, comment)
  }

  _onLikeComment = (commentId, like) => {
    if (!this.props.token) return
    this.props.likeComment(commentId, this.props.user.accountId, like)
  }

  _setFavorite(fav) {
    this.props.setFavorite(this.props.id, fav)
  }

  _goToWine = (wine) => {
    this.props.clearDetail()
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

  _openPairing = (pairing) => {
    const { typeOfFoods, ingredients, } = pairing

    this.props.navigator.showModal({
      screen: SCREEN_IDS.PAIRING_DETAIL,
      title: pairing.title,
      passProps: {
        pairing: pairing,
        foodType: typeOfFoods[0],
        ingredient: ingredients[0],
      }
    })
  }

  render() {
    const { loading, data, loadingRelated, relatedWines, loadingPairings, pairings, user, } = this.props

    if (loading || !data) {
      return <Loading />
    }

    const userSuggestion = _.reduce(data.vintages, (result, n) => {
      return n.userSuggestion && result
    }, true)

    const mainVintage = _.find(data.vintages, (vintage) => {
      if (!vintage.userSuggestion) {
        return true
      }
    })

    const isFavorite = user && _.find(data.favoriteOff, (favorite) => user.accountId === favorite.id)

    let varietalComposition = {}
    let varieties = mainVintage ? mainVintage.varietalComposition.map((varietie, idx) => {
      varietalComposition = Object.assign({}, varietalComposition, varietie)
      return (
        <View key={Object.keys(varietie)[0]} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS[idx], marginRight: 10 }} />
          <Text style={[styles.infoValue, { fontSize: 11 }]}>
            {_.capitalize(VARIETIES_LABELS[Object.keys(varietie)[0]])}
          </Text>
        </View>
      )
    }) : []

    let varietalCompositionValues = Object.values(varietalComposition).map(v => { return Number(v) })
    if (varietalCompositionValues.length == 1) {
      varietalCompositionValues.push(0.1)
    }

    let mainAromas = mainVintage ? mainVintage.mainAromas : []
    let province = data.winery.state ? _.find(STATES, { id: data.winery.state }) : {}

    return (
      <View style={styles.viewContainer}>
        <CommentViewContainer
          offset={Platform.OS === 'ios' ? 65 : 85}
          active={this.state.commentActive}
          onClose={() => { this.setState({ commentActive: false }) }}
          onComment={this._comment}>
          <ScrollView ref="scrollView" style={{ flex: 1, }}>
            <View style={[styles.card, styles.infoCard,]} elevation={1}>
              <View style={styles.generalInfoContainer}>
                <View style={{ width: 68, flex: 0, height: 209 }}>
                  {data.picture ?
                    <Image
                      source={{ uri: 'https://newapi.vinoapp.co/api/images/' + data.picture }}
                      style={{ height: 209, width: 68 }}
                      height={209}
                      width={68}
                      resizeMode={'contain'}
                      key={data.id} /> :
                    <Image
                      source={GENERIC_BOTTLE}
                      style={{ height: 180, width: 48 }}
                      height={180}
                      width={48} />
                  }
                </View>
                <View key="general-info" style={styles.generalInfo}>
                  <Text style={styles.generalInfoTitle}>{I18n.t('wine.general_info')}</Text>
                  <View style={styles.generalInfoItem}>
                    <Text style={styles.infoLabel}>{I18n.t('wine.winery')}</Text>
                    <Text style={styles.infoValue}>
                      {data.winery.name}
                    </Text>
                  </View>

                  <View style={styles.generalInfoItem}>
                    <Text style={styles.infoLabel}>{I18n.t('wine.province')}</Text>
                    <Text style={styles.infoValue}>
                      {province ? province.name : '-'}
                    </Text>
                  </View>

                  <View style={styles.generalInfoItem}>
                    <Text style={styles.infoLabel}>{I18n.t('wine.zone')}</Text>
                    <Text style={styles.infoValue}>
                      {data.zone ? data.zone.name : '-'}
                    </Text>
                  </View>

                  <View style={styles.generalInfoItem}>
                    <Text style={styles.infoLabel}>{I18n.t('wine.sub_zone')}</Text>
                    <Text style={styles.infoValue}>
                      {data.subZone ? data.subZone.name : '-'}
                    </Text>
                  </View>

                  <View style={styles.generalInfoItem}>
                    <Text style={styles.infoLabel}>{I18n.t('wine.type')}</Text>
                    <Text style={styles.infoValue}>
                      {_.capitalize(data.type)} Wine
                      </Text>
                  </View>

                  {
                    !userSuggestion &&
                    <View style={styles.generalInfoItem}>
                      <Text style={styles.infoLabel}>{I18n.t('wine.elevation')}</Text>
                      <Text style={styles.infoValue}>{data.elevation} {I18n.t('wine.feets')}</Text>
                    </View>
                  }

                  {
                    !userSuggestion &&
                    <View style={styles.generalInfoItem}>
                      <Text style={styles.infoLabel}>{I18n.t('wine.varieties')}</Text>
                      <View style={{ flexDirection: 'column', flex: 1, marginTop: 5 }}>
                        {varieties}
                      </View>
                    </View>
                  }

                  {
                    userSuggestion &&
                    <View style={{ borderWidth: 1, borderColor: '#34404c', marginBottom: 15, paddingVertical: 5, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name={'md-contact'} size={32} color={colors.primaryColor} />
                      <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 14, marginLeft: 15, color: '#444' }}>{I18n.t('wine.user_suggestion')}</Text>
                    </View>
                  }

                </View>
              </View>

              {
                /* !userSuggestion &&
                  <View style={ styles.badgesContainer }>
                    {
                      data.vintages && mainVintage && mainVintage.personality.map(personality => {
                        return <PersonalityIcon name={ personality } key={ personality } width={ 48 } height={ 48 } />
                      })
                    }
                  </View> */
              }
            </View>

            {/*NOOOOOOOO<View key='score' style={ styles.score }>
                <View style={ styles.scorePoints }>
                  <Text style={ styles.points }>0</Text>
                  <Text style={ styles.reviewsCount }>0 reviews</Text>
                </View>

                <View style={ styles.raitingBar} >
                  <RaitingBar raiting={0} size={35} />
                </View>
              </View>*/}

            { /* Vino App Rate  */}
            {
              !userSuggestion &&
              <View key='rate' style={[styles.card, { marginTop: 5, minHeight: 240 }]} elevation={1}>
                <View style={styles.rateContainer}>
                  <View style={styles.rate}>
                    <Text style={styles.rateValue}>{data.averageScore}</Text>
                    <Text style={styles.rateString}>VinoApp Rate</Text>
                  </View>

                  <View style={{ flex: 1, paddingBottom: 5, }}>
                    <View style={styles.mainAromas}>
                      <Text style={styles.aromasTitle}>{I18n.t('wine.main_aromas')}</Text>
                      <View style={styles.aromasList}>
                        <MainAromaIcon name={mainAromas[0]} count={1} style={{ borderLeftWidth: 0 }} />
                        <MainAromaIcon name={mainAromas[1]} count={2} />
                        <MainAromaIcon name={mainAromas[2]} count={3} style={{ borderRightWidth: 0 }} />
                      </View>
                    </View>

                    <View style={styles.intensityWheelTitleContainer}>
                      <Text style={styles.intensityWheelTitle}>{I18n.t('wine.intensity_wheel')}</Text>
                      <TouchableOpacity onPress={() => { this.setState({ openModal: true }) }} style={{ width: 20, height: 20, position: 'absolute', right: 10, top: 0, marginTop: 0, flex: 1, zIndex: 200 }}>
                        <Icon name="md-help-circle" size={18} color={colors.primaryColor} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.notes}>
                        <View style={styles.noteItem}>
                          <View style={[styles.notePoint, { backgroundColor: '#e90f4c' }]} />
                          <Text style={styles.noteName}>{I18n.t('wine.acidity')}</Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View style={[styles.notePoint, { backgroundColor: '#6d1d61' }]} />
                          <Text style={styles.noteName}>{I18n.t('wine.aroma')}</Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View style={[styles.notePoint, { backgroundColor: '#1b73a3' }]} />
                          <Text style={styles.noteName}>{I18n.t('wine.spice')}</Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View style={[styles.notePoint, { backgroundColor: '#50ba4a' }]} />
                          <Text style={styles.noteName}>{I18n.t('wine.fruit')}</Text>
                        </View>

                        <View style={styles.noteItem}>
                          <View style={[styles.notePoint, { backgroundColor: '#d58f5f' }]} />
                          <Text style={styles.noteName}>{I18n.t('wine.wood')}</Text>
                        </View>
                      </View>

                      <View style={styles.intensityWheelContainer}>
                        <IntensityWheel
                          width={100}
                          height={100}
                          values={!_.isEmpty(mainVintage) ? mainVintage.intensity : {}}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }

            {user ? (
              !userSuggestion &&
              <View style={styles.actions}>
                {this.props.token &&
                  <TouchableOpacity
                    style={[styles.actionsButton, styles.card, { backgroundColor: colors.primaryColor }]}
                    onPress={() => { this._setFavorite(!isFavorite) }}>
                    <utils.heartIcon size={24} />
                    {isFavorite ?
                      <Text style={styles.actionsButtonText}>{I18n.t('wine.remove_from_favorites')}</Text> :
                      <Text style={styles.actionsButtonText}>{I18n.t('wine.add_to_favorites')}</Text>
                    }
                  </TouchableOpacity>
                }

                {/*<TouchableOpacity style={[ styles.actionsButton, styles.card ]}>
                      <Icon name="md-share" size={18} color={ Colors.primaryColor }/>
                      <Text style={ styles.actionsButtonText }>Share wine</Text>
                    </TouchableOpacity> */}
              </View>
            ) : <View style={{ marginTop: 30 }}></View>
            }


            {
              userSuggestion &&
              <View style={[styles.card, { marginBottom: 30, padding: 15, }]} elevation={1}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <View style={{ justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row' }}>
                    <Icon name={'md-contact'} size={48} color={colors.primaryColor} />
                    <View>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, marginLeft: 15, marginBottom: 5, color: '#444' }}>{I18n.t('wine.user_suggestion')}</Text>
                      <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 12, marginLeft: 15, color: '#34404c' }}>
                        {I18n.t('wine.user_suggestion_txt')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            }

            {/* Vintages 
                <WineVintages vintages={ data.vintages } wine={ data } onSelect={ this._gotToVintage } />
            */}


            {/* Info  */}
            {
              !userSuggestion &&
              <View key='info' style={[styles.card, styles.infoContainer, { }]} elevation={1}>
                <Text style={styles.sectionTitle}>{I18n.t('wine.wine_general_info')}</Text>
                <View style={styles.infoRow}>
                  <View style={[styles.infoCol, { borderRightWidth: 1, borderColor: '#34404c', paddingRight: 5, marginRight: 15 }]}>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84, }]}>{I18n.t('wine.ageability')}</Text>
                      <Text style={styles.infoValue}>{data.ageability} - {data.ageabilityTo} {I18n.t('wine.years')}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 84, }]}>{I18n.t('wine.sweetness')}</Text>
                      <Text style={styles.infoValue}>{_.capitalize(data.sweetness)}</Text>
                    </View>
                  </View>

                  <View style={[styles.infoCol,]}>
                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 100, marginRight: 5 }]}>{I18n.t('wine.single_vineyard')}</Text>
                      <Text style={styles.infoValue}>
                        {data.singleVineyard ? I18n.t('yes') : I18n.t('no')}
                      </Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={[styles.infoLabel, { width: 100, marginRight: 5, }]}>{I18n.t('wine.serving_temp')}</Text>
                      <Text style={styles.infoValue}>{data.servingTemp}ºC</Text>
                    </View>
                  </View>
                </View>
              </View>
            }

            {/* WineryAccess */}
            <View style={[styles.card, { marginTop: 30, padding: 20 }]} elevation={1}>
              <Text style={{ fontSize: 16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 15, textAlign: 'center' }}>{data.winery.name}</Text>
              <Button
                onPress={this._goToWinery}
                style={{ marginLeft: 60, marginRight: 60, height: 36 }}
                label={I18n.t('wine.view_winery')}
                rounded
              />
            </View>

            {/* WineMaker */}
            {
              data.winery.wineMakers.length > 0 ?
                <View key='winemaker' style={styles.wineMakersContainer}>
                  <Text style={styles.wineMakerTitle}>{I18n.t('winery.winemakers_voice')}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this._buildWineMakers()}
                  </View>
                </View> : null
            }

            { /* Pairings */}
            {
              (loadingPairings && pairings && pairings.length > 0) &&
              <View key='pairings' style={styles.pairingsContainer}>
                <Text style={styles.pairingsTitle}>Some perfect matches with this wine</Text>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                  {
                    pairings.map(pairing => (
                      <View
                        key={`pairings-${pairing.id}`}
                        style={{ width: width / 2 - 15 }}>
                        <VideoBox
                          onPress={() => this._openPairing(pairing)}
                          thumb={{ uri: pairing.thumb }}
                          height={100}
                        />
                      </View>
                    ))
                  }
                </View>
              </View>
            }

            {/* Related Wines  */}
            {
              !loadingRelated && !_.isEmpty(relatedWines) && !userSuggestion ?
                <View key="related-wines" style={styles.relatedWinesContainer} elevation={1}>
                  <Text style={styles.relatedWinesTitle}>{I18n.t('wine.related_wines')}</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                      relatedWines.map(wine => {
                        return (
                          <TouchableOpacity style={{ width: 70, flex: 0, height: 147, marginLeft: 15, marginRight: 15, alignItems: 'center' }} key={'wine-' + wine.id} onPress={() => { this._goToWine(wine) }}>
                            {
                              wine.picture ?
                                <Image source={{ uri: 'https://newapi.vinoapp.co/api/images/' + wine.picture }} height={110} width={45} style={{ width: 45, height: 110 }} resizeMode={'contain'} /> :
                                <Image source={GENERIC_BOTTLE} />
                            }
                            <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 11, color: '#34404c', textAlign: 'center', marginTop: 10 }}>{wine.name}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </View> : null
            }


            {/* Comments Box */}
            <View onLayout={(evt) => {
              let { height, y } = evt.nativeEvent.layout
              let pos = y
              this.setState({ 'bottom': pos })
            }}>
              <CommentsList
                title={I18n.t('article.comments')}
                objectType={'wine'}
                loading={this.props.loadingComments}
                comments={this.props.comments}
                showButton={!this.state.commentActive && this.props.token}
                user={this.props.user ? this.props.user.accountId : null}
                writeComment={() => { this.setState({ commentActive: true }) }}
                onLikeComment={this._onLikeComment}
              />
            </View>
          </ScrollView>
        </CommentViewContainer>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.openModal}
          onRequestClose={() => { }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ margin: 15, backgroundColor: '#FFF', paddingHorizontal: 25, paddingVertical: 30, borderRadius: 4, }}>
              <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>{I18n.t('wine.intensity_wheel')}</Text>
              <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 13, color: '#34404c' }}>
                We designed the Intensity Wheel to express how do we classified each wine regarding the INTENSITY of 5 atributes: acidity, aromas, spice, fruit and wood. {"\n"}{"\n"}
                Scale:
              </Text>

              <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 13, color: '#34404c', marginLeft: 20, marginTop: 5, lineHeight: 22, marginBottom: 10 }}>
                0 - No presence{"\n"}
                1 - Slight intensity{"\n"}
                2 - Low intensity{"\n"}
                3 - Moderate intensity{"\n"}
                4 - Significant intensity{"\n"}
                5 - High intensity{"\n"}
              </Text>

              <Button
                onPress={() => { this.setState({ openModal: false }) }}
                style={{ marginLeft: 80, marginRight: 80, height: 30 }}
                rounded={true}
                label={I18n.t('close')} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Screen(WineView, {
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
