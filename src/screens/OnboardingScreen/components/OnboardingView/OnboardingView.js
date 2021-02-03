import React from 'react'
import { View, Text, ImageBackground, Image, StatusBar, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper';
import Screen from 'hocs/ScreenHoc'
import { SCREEN_IDS, } from 'screens'
import Button from 'components/Button'
import NavStyles from 'theme/NavigatorStyles'
import { colors, } from 'theme'
import { STEPS, } from './constants'
import styles from './styles'

const STEP_IMG_1 = require('images/onboarding/slider1.png')
const STEP_IMG_2 = require('images/onboarding/slider2.png')
const STEP_IMG_3 = require('images/onboarding/slider3.png')


//<Image source={STEP_IMG_2b} style={{ position: 'absolute', left: 0, top: '20%' }} />


class OnboardingView extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  _goToLogin = () => {
    this.props.navigator.push({
      screen: SCREEN_IDS.WELCOME,
    })
  }

  _renderPage = (data) => {
    return (
      <View>
        <Text>{data.title}</Text>
      </View>
    )
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Swiper
           ref={ref => this.swiper = ref}
           style={ styles.swiperWrapper }
           dot={<View style={{backgroundColor: '#9b9b9b', width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight: 5, marginTop: 0, marginBottom: 0 }} />}
           activeDot={<View style={{backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight: 5, marginTop: 0, marginBottom: 0 }} />}
           paginationStyle={{position:'absolute', bottom: 10}}
           loop={false}
        >
          <View style={[styles.slide, { width }]}>
            <Image source={STEP_IMG_1} />
            <Text style={styles.welcomeTitle}>{STEPS['en'][0].title}</Text>
            <View>
              <Text style={styles.welcomeMessage}>{STEPS['en'][0].text.map(text => `${text}\n`)}</Text>
            </View>
          </View>

          <View style={[styles.slide, { width }]}>
            <Image style={{ alignSelf: 'flex-start' }} source={STEP_IMG_2} />
            <Text style={styles.welcomeTitle}>{STEPS['en'][1].title}</Text>
            <View>
              <Text style={styles.welcomeMessage}>{STEPS['en'][1].text.map(text => `${text}\n`)}</Text>
            </View>
          </View>

          <View style={[styles.slide, { width }]}>
            <Image source={STEP_IMG_3} />
            <Text style={styles.welcomeTitle}>{STEPS['en'][2].title}</Text>
            <View>
              <Text style={styles.welcomeMessage}>{STEPS['en'][2].text.map(text => `${text}\n`)}</Text>
            </View>
          </View>
        </Swiper>

        <Button
          onPress={this._goToLogin}
          style={{ height: 50, }}
          label="Let's Start"
          action
        />
      </View>
    )
  }
}

export default Screen(OnboardingView, {
  navigatorStyle: NavStyles.welcome,
})
