import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, WebView, } from 'react-native'
import I18n from 'react-native-i18n'
import Screen from 'hocs/ScreenHoc'
import Icon from 'react-native-vector-icons/Ionicons'
import { SCREEN_IDS, } from 'screens'
import NavStyles from 'theme/NavigatorStyles'
import { colors, utils, } from 'theme'
import Spinner from 'react-native-spinkit'
import YoutubePlayer from 'react-native-youtube'
import WineCard from 'components/WineCard'

import styles from './styles'

class WineMakerView extends React.Component {
  state = {
    play: false,
    video: true,
  }

  componentDidMount() {
    this.props.fetchWines(this.props.winery.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screenId === nextProps.screenId) {
      this.setState({ video: true, })
    }
  }

  _goToWine(wine) {
    this.setState({ video: false, })
    this.props.goToWine(wine)
  }

  _buildRelatedWines = () => {
    return this.props.wines ? this.props.wines.map((wine, idx) => {
      return (
        <WineCard key={'wine-' + idx} data={wine} onPress={() => this._goToWine(wine)} />
      )
    }) : []
  }

  render() {
    const { video } = this.state
    const videoID = this.props.wineMaker.video.split('=')[1]
    const { wineMaker, winery, wines, } = this.props

    return (
      <View style={{ flex: 1, }}>
        <View style={styles.videosContainer}>
          {
            (video && utils.platform === 'ios') &&
            <YoutubePlayer
              ref="youtubePlayer"
              apiKey={'AIzaSyB2qwnsS7ZEfj9Lq2-4ArVTAGVF1W30XZc'}
              videoId={videoID} // The YouTube video ID
              play={this.state.play}           // control playback of video with true/false
              fullscreen={false}
              loop={false}          // control whether the video should loop when ended
              rel={false}
              onReady={(e) => { this.setState({ isReady: true }) }}
              onChangeState={(e) => {
                this.setState({
                  status: e.state, play: e.state !== 'paused'
                })
              }}
              modestbranding={true}
              controls={0}
              style={{
                height: 320,
                backgroundColor: 'black',
                //marginTop: -35,
                width: '100%'
              }}
            />
          }
          {
            (video && utils.platform === 'android') &&
            <WebView
              ref={(wv) => this.webview = wv}
              style={{ height: 120, width: '100%' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: `https://www.youtube.com/embed/${videoID}?mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent&amp;controls=0&amp;enablejsapi=1&amp;modestbranding=0` }}
            />
          }

          {
            utils.platform === 'ios' &&
            <TouchableOpacity style={styles.control} activeOpacity={1} onPress={() => { this.setState({ play: !this.state.play }) }}>
              {
                !this.state.play &&
                <View style={styles.overlay}>
                  <View style={{ backgroundColor: '#DDD', borderRadius: 70, width: 70, height: 70, marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="md-play" size={38} color={'#FFF'} style={{ backgroundColor: 'transparent', marginLeft: 8 }} />
                  </View>
                </View>
              }
            </TouchableOpacity>
          }

        </View>
        <ScrollView style={[ styles.content, {zIndex: 1000, marginTop: utils.platform === 'ios' ? 0: 0 } ]} contentContainerStyle={{ paddingBottom: 50, paddingTop: 30, }}>
          <Text style={styles.title}>{wineMaker.name}</Text>
        <Text style={styles.subTitle}>{winery.name}</Text>

        <View style={styles.relatedWinesContainer}>
          {wines && wines.length > 0 ?
            <View>
              <Text style={styles.relatedTitle}>{I18n.t('winery.the_wines')}</Text>
              <View style={styles.vintageContainer}>
                {this._buildRelatedWines()}
              </View>
            </View> : null
          }
        </View>
        </ScrollView>
      </View >
    )
  }
}

export default Screen(WineMakerView, {
  navigatorStyle: NavStyles.tab,
  navigatorButtons: {
    leftButtons: [{
      icon: 'vback',
      type: 'custom',
      id: 'backs',
    }],
    rightButtons: []
  }
})
