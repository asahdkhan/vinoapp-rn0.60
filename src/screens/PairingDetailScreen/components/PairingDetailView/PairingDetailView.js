import React from 'react'
import { View, ScrollView, Text, WebView, TouchableOpacity, } from 'react-native'
import I18n from 'react-native-i18n'
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { utils, } from 'theme'
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-spinkit'
import YoutubePlayer from 'react-native-youtube'
import WineCard from 'components/WineCard'
import VideoBox from '../VideoBox'

import styles from './styles'

class PairingDetailView extends React.Component {
  state = {
    mainFood: {},
    mainIngredient: {},
    video: true,
    relatedPairings: false,
    relatedWines   : false,
    width: 120,
  }

  constructor(props) {
    super(props)
    this.lang = I18n.locale.substr(0,2)
  }

  componentDidMount() {
    const { ingredient, foodType, pairing, } = this.props

    let mainIngredient = ingredient && ingredient.value != '' ? ingredient : false
      //_.find(INGREDIENTS['es'], (o) => { return o.value == pairing.ingredients[0] });

    let mainFood = (foodType && foodType.value != '') ? foodType : false
      //_.find(TYPE_FOOD['es'], (o) => { return o.value == pairing.typeOfFoods[0] });

    this.setState({
      mainFood: mainFood,
      mainIngredient: mainIngredient,
      video: true,
    })

    setTimeout(() => {
      this.props.searchRelated(mainFood.value, mainIngredient.value, pairing.id)
      this.props.searchPairingWines(pairing.id)
    }, 500)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selectedPairing == this.props.pairing.id
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screenId === nextProps.screenId) {
      this.setState({
        video: true,
      })
    }

    if (this.props.selectedPairing === nextProps.selectedPairing) {
      if (this.props.loadingVideos && !nextProps.loadingVideos) {
        this.setState({
          relatedPairings: nextProps.relatedPairings,
        }) 
      }
      
      if (this.props.loadingWines && !nextProps.loadingWines) {
        this.setState({
          relatedWines: nextProps.relatedWines,
        })
      }
    }
  }

  componentWillUnmount() {
    //this.props.clearDetail()
    this.setState({
      video: false,
    })
  }

  onNavigationEvent = (event) => {
    if (event.id === 'willDisappear') {
      this.setState({ video: false })
    }

    if (event.id === 'willAppear' && this.props.screenId === 'vinoapp.main.pairings.detail') {

      this.setState({ video: true })
    }
  }

  _openVideo = (pairing) => {
    this.props.selectPairing(pairing.id)
    this.props.clearDetail()
    // this.setState({
    //   video: false,
    // })

    this.props.navigator.showModal({
      screen: SCREEN_IDS.PAIRING_DETAIL,
      title : pairing.title,
      passProps: {
        pairing : pairing,
        foodType: this.state.mainFood,
        ingredient: this.state.mainIngredient,
      }
    })
  }

  _buildVideoList() {
    const { relatedPairings, } = this.props

    return relatedPairings ? relatedPairings.map(pairing => (
      <View key={`pairings-${pairing.id}`} style={{ flex: 0, minWidth: '50%', padding: 2.5, }}>
        <VideoBox
          onPress={ () => { this._openVideo(pairing) }}
          thumb={{ uri: pairing.thumb }}
          height={ 110 } 
        />
      </View>
    )) : []
  }

  _buildPairingList = () => {
    return this.props.relatedWines ? this.props.relatedWines.map((wine, idx) => {
      return (
        <WineCard
          key={ 'wine-'+idx }
          data={ wine } 
          onPress={() => {
            this.setState({
              video: false,
            })
            this.props.navigator.push({
              screen: SCREEN_IDS.WINE,
              title: wine.name,
              passProps: {
                id: wine.id,
                wine: wine,
              }
            })
          }} />
      )
    }) : [];
  }

  _buildSubtitle() {    
    return (
      <Text style={ styles.subTitle }>
        { this.state.mainFood.name ? `${this.state.mainFood.name} / ` : `` }{this.state.mainIngredient.name }
      </Text>
    )
  }

  render() {
    const { video } = this.state
    const { pairing, } = this.props
    const { relatedPairings, relatedWines, } = this.state
    let videoID = pairing.video.split('=')[1]

    return (
      <View style={{ flex: 1, }}>
        <View style={{ height: 240, }}>
          {
            (video && utils.platform === 'android') && 
              <WebView
                ref={ (wv) => this.webview = wv }
                style={{ height: 120, width: '100%'}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: `https://www.youtube.com/embed/${videoID}?mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent&amp;controls=0&amp;enablejsapi=1&amp;modestbranding=0` }}
              />
          }
          {
            (video && utils.platform === 'ios') &&
              <YoutubePlayer
                key={ videoID }
                ref={(video) => { this.youtubePlaye = video  }}
                apiKey={'AIzaSyB2qwnsS7ZEfj9Lq2-4ArVTAGVF1W30XZc'}
                videoId={ videoID }
                play={ this.state.play }          
                hidden={false}         
                loop={false}         
                rel={ false }
                fullscreen={false}
                onReady={(e)=>{
                  this.setState({ height: 320 })
                  this.setState({isReady: true})
                }}
                onChangeState={(e)=>{
                  this.setState({status: e.state })
                }}
                onError={(e)=>{  this.setState({error: e.error})}}
                modestbranding={false}
                controls={1}
                style={{alignSelf: 'stretch', width: '100%', zIndex: 100, height: 320, backgroundColor: 'black', marginTop: -55, }} 
              />
          }

          {
            (utils.platform === 'ios' && this.state.isReady) ? 
              <TouchableOpacity
                style={[ styles.overlay, { zIndex: 111 }, this.state.play && { backgroundColor: 'transparent'}  ]} 
                activeOpacity={1}
                onPress={ () => this.setState({ play: !this.state.play }) }>
                { 
                  !this.state.play && 
                    <View style={{ backgroundColor: '#DDD', borderRadius: 75, width: 75, height: 75, marginTop: -15, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="md-play" size={38} color={'#FFF'} style={{ backgroundColor: 'transparent', marginLeft: 8}} />
                    </View>
                }
              </TouchableOpacity> : null
            }
          }
        </View>
        <ScrollView style={{ backgroundColor: '#F5F5F5', marginTop: utils.platform === 'ios' ? -25 : 0, flex: 1, paddingTop: 15 }} >
          <Text style={ styles.title }>{ pairing.title }</Text>
          { this._buildSubtitle() }

          <View style={{ marginTop: 38, }}>
            { 
              relatedWines.length > 0 ?
                <View> 
                  <Text style={ styles.relatedTitle }>{ I18n.t('pairings.related_wines') }</Text>
                  <View style={ styles.vintageContainer }>
                    { this._buildPairingList() }
                  </View>
                </View> : null 
            }


            { 
              relatedPairings.length > 0 ?
                <View>
                  <Text style={ styles.relatedTitle }>{ I18n.t('pairings.related_videos') }</Text>
                  <View style={ styles.videosContainer }>
                    { this._buildVideoList() }
                  </View>
                </View> : null
            }
          </View>
          </ScrollView>
      </View>
    )
  }
}

export default Screen(PairingDetailView, {
  navigatorStyle: NavStyles.tab,
  navigatorButtons: {
    leftButtons: [],
    rightButtons: [{
      id: 'close',
      icon: 'close',
      type: 'custom',
    }]
  }
})
