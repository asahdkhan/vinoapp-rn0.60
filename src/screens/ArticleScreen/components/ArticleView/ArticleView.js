import React from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Linking, Dimensions, ImageBackground, Platform, WebView, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import { colors, utils, } from 'theme'

import YoutubePlayer from 'react-native-youtube'
import Lightbox from 'react-native-lightbox'

import CommentViewContainer from 'components/CommentViewContainer'
import CommentsList from 'components/CommentsList'
import Loading from 'components/Loading'
import Hyperlink from 'react-native-hyperlink'

const DEFAULT_COVER = require('images/articles/default-image.png')
const OVERLAY = require('images/articles/overlay.png')

import styles from './styles'

const { height, width } = Dimensions.get('window')

class ArticleScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 360,
      commentActive: false,
      commentHeight: 40,
      comment: '',
      bottom: 0,
      headerVisible: true,
      play: false,
      videoLoaded: false,
      isLoading: true
    };
  }

  componentWillMount() {
    this.props.getArticle(this.props.id)
    this.props.fetchComments(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.commentCreated && nextProps.commentCreated) {
      this.setState({ commentActive: false }, () => {
        this.refs.parallaxView.scrollTo({ x: 0, y: this.state.bottom, animated: true })
      })
    }

    if (nextProps.data && nextProps.data.video != '-' && nextProps.data.video != 'undefined' && (nextProps.data.video && nextProps.data.video.length > 1)) {
      this.setState({
        headerVisible: false
      })
    }
  }

  componentWillUnmount() {
    this.props.clearDetail()
  }

  _comment = (comment) => {
    this.props.comment(this.props.data.id, this.props.user.accountId, comment)
  }

  _like = (like) => {
    if (!this.props.token) return
    this.props.setLike(this.props.data.id, this.props.user.accountId, like)
  }

  _onLikeComment = (commentId, like) => {
    if (!this.props.token) return
    this.props.likeComment(commentId, this.props.user.accountId, like)
  }

  _buildForeground = (videoID) => {
    if (this.props.data && this.props.data.video !== '-' && this.props.video) {
      return <View />
    }

    let lightboxStyle = {
      height: width - 5 * 2,
      width: width - 5 * 2,
      marginLeft: 5
    }

    let img = (
      <View style={{ width: width }}>
        <Image
          style={lightboxStyle}
          source={{ uri: 'https://newapi.vinoapp.co/api/images/articles/' + this.props.data.picture + '?v=' + new Date().getTime() }}
          resizeMode="contain"
        />
      </View>
    )

    return (
      <View style={styles.coverContainer}>
        {
          videoID ?
            <View style={{ flex: 1 }}></View>
            :
            this.props.data.picture ?
              <View style={{ flex: 1 }}>
                <ImageBackground
                  style={styles.cover}
                  source={{ uri: 'https://newapi.vinoapp.co/api/images/articles/' + this.props.data.picture }}
                >
                  <Image
                    source={OVERLAY}
                    style={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, width: width }}
                  />
                  <Lightbox
                    renderContent={() => { return img }}
                    onOpen={() => { this.setState({ 'headerVisible': false }) }}
                    onClose={() => { this.setState({ 'headerVisible': true }) }}
                    style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1, height: 250, justifyContent: 'flex-end', zIndex: 1000, }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }}>
                      <Text style={{ color: '#FFF' }}>{I18n.t('article.see_photo')}</Text>
                      <Icon name="ios-expand" style={{ fontSize: 30, marginLeft: 15, color: '#FFF' }} />
                    </View>
                  </Lightbox>
                </ImageBackground>
              </View> :
              <Image source={DEFAULT_COVER} style={styles.defaultCover} />
        }

      </View>
    );
  }


  _buildHeader = (videoID) => {
    let headerVisible = this.state.headerVisible ? {} : { backgroundColor: colors.primaryColor };

    return (
      <View style={[styles.header, headerVisible]}></View>
    )
  }

  _likeCount = () => {
    if (this.props.data.likes && this.props.data.likes.length > 0) {
      return <Text>({this.props.data.likes.length} {I18n.t('article.likes')})</Text>
    }
  }

  _playVideo() {
    this.setState({
      play: true
    })
  }

  _commomContent = (content, title, likeIt) => {
    return (
      <View>
        <View style={[styles.content,]}>
          <Text style={styles.title}>{title}</Text>

          <Hyperlink
            onPress={url => Linking.openURL(url)}
            linkStyle={{
              color: '#34404c', fontFamily: 'Raleway-Regular',
            }}>
            <Text style={styles.text}>{content}</Text>
          </Hyperlink>
        </View>


        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => { this._like(!likeIt) }}
          >
            {this.props.user &&
              (<Icon
                name="md-heart"
                size={18}
                color={likeIt ? colors.primaryColor : '#dadada'}
              />
              )
            }
            <Text style={styles.actionsButtonText}>
              {I18n.t('feed.like')} {this._likeCount()}
            </Text>
          </TouchableOpacity>
        </View>

        <View onLayout={(evt) => {
          let { height, y } = evt.nativeEvent.layout;
          let pos = y;
          this.setState({ 'bottom': pos })
        }}>
          <CommentsList
            title={I18n.t('article.comments')}
            objectType={'article'}
            loading={this.props.loadingComments}
            comments={this.props.comments}
            showButton={!this.state.commentActive && this.props.token}
            user={this.props.user ? this.props.user.accountId : null}
            writeComment={() => { this.setState({ commentActive: true }) }}
            onLikeComment={this._onLikeComment}
          />
        </View>
      </View>
    )
  }

  render() {
    const { data, loading, } = this.props
    let iOS = utils.isIphoneX ? 82 : 65

    let videoID = false
    if (data && data.video && data.video != '-') {
      videoID = data.video.split('=')[1]
    }
    if (videoID) {
      this.props.navigator.setStyle({
        navBarTransparent: false,
        navBarBackgroundColor: colors.primaryColor
      })
    }

    let content, title, likeIt
    let headerVisible = this.state.headerVisible ? {} : { backgroundColor: colors.primaryColor };

    if (!loading && data) {
      content = I18n.locale.substr(0, 2) == 'en' ? data.content : data.content_es ? data.content_es : data.content
      title = I18n.locale.substr(0, 2) == 'en' ? data.title : data.title_es ? data.title_es : data.title
      likeIt = _.find(this.props.data.likes, (like) => { return this.props.user && this.props.user.accountId === like.id })
    }

    return (
      <View style={{ flex: 1, }}>
        {(loading || !data) ?
          <Loading /> :
          <CommentViewContainer
            active={this.state.commentActive}
            onClose={() => { this.setState({ commentActive: false }); }}
            onComment={this._comment}>
            {
              videoID ?
                <View style={{ flex: 1, }}>
                  <View style={{ position: 'relative' }}>
                    {
                      utils.platform === 'ios' &&
                      <YoutubePlayer
                        key={videoID}
                        ref={(video) => { this.youtubePlaye = video }}
                        apiKey={'AIzaSyB2qwnsS7ZEfj9Lq2-4ArVTAGVF1W30XZc'}
                        videoId={videoID}
                        play={this.state.play}
                        hidden={false}
                        loop={false}
                        rel={false}
                        fullscreen={false}
                        onReady={(e) => {
                          this.setState({ height: 361 })
                          this.setState({ isReady: true })
                        }}
                        onChangeState={(e) => {
                          this.setState({ status: e.state })
                        }}
                        onError={(e) => { this.setState({ error: e.error }) }}
                        modestbranding={false}
                        controls={1}
                        style={{ alignSelf: 'stretch', width: width, zIndex: 100, height: this.state.height, backgroundColor: 'black', marginTop: 0, }}
                      />

                    }

                    {!this.state.play && this.state.isReady ?
                      <TouchableOpacity style={[styles.overlay, { zIndex: 111 }]} activeOpacity={1} onPress={this._playVideo.bind(this)}>
                        <View style={{ backgroundColor: '#DDD', borderRadius: 75, width: 75, height: 75, marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
                          <Icon name="md-play" size={38} color={'#FFF'} style={{ backgroundColor: 'transparent', marginLeft: 8 }} />
                        </View>
                      </TouchableOpacity> : null
                    }

                  </View>
                  <ScrollView style={{ flex: 1 }}>
                    {videoID && utils.platform !== 'ios' &&
                      <WebView
                        style={{ flex: 1, marginTop: 82, height: 361, width: '100%' }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: `https://www.youtube.com/embed/${videoID}?mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent&controls=0` }}
                      />}
                    {this._commomContent(content, title, likeIt)}
                  </ScrollView>
                </View>

                :
                <ParallaxScrollView
                  ref='parallaxView'
                  backgroundColor={colors.primaryColor}
                  contentBackgroundColor="#F6F6F6"
                  parallaxHeaderHeight={250}
                  stickyHeaderHeight={Platform.OS == 'ios' ? iOS : 82}
                  renderForeground={() => this._buildForeground(videoID)}
                  renderFixedHeader={() => this._buildHeader(videoID)}
                  onChangeHeaderVisibility={(visible) => {
                    if (!videoID) {
                      this.setState({ 'headerVisible': visible })
                    }
                  }}>
                  {this._commomContent(content, title, likeIt)}
                </ParallaxScrollView>
            }

            {

            }
          </CommentViewContainer>
        }
      </View>
    );
  }
}

export default Screen(ArticleScreen, {
  navigatorStyle: {
    ...NavStyles.tab,
    drawUnderNavBar: true,
    navBarTransparent: true,
    navBarTranslucent: true,
    navBarBackgroundColor: false,
    tabBarHidden: true,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: '#FFF',
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
