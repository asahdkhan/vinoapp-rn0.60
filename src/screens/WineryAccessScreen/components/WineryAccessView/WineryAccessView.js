import React from 'react'
import { View, Text, ImageBackground, Image, Linking, } from 'react-native'
import Screen from 'hocs/ScreenHoc'
import NavStyles from 'theme/NavigatorStyles'
import I18n from 'react-native-i18n'
import Button from 'components/Button'

import styles from './styles'

class WineryAccessView extends React.Component {

  render() {
    return (
      <View style={styles.viewContainer}>
        <View>
          <Text style={styles.welcomeTitle}>{I18n.t('winery_access.what_are_we_wating')}</Text>
          <Text style={[styles.welcomeText, { marginTop: 50 }]}>{I18n.t('winery_access.be_part')}</Text>

          <Text style={[styles.welcomeText, { marginTop: 20 }]}>{I18n.t('winery_access.samples')}</Text>

          <Button
            onPress={() => { Linking.openURL('http://vinoapp.co').catch(err => console.error('An error occurred', err)); }}
            style={styles.buttonVinoApp}
            labelStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 18, color: '#ffffff' }}
            label={I18n.t('winery_access.check_here')}
          />
        </View>
      </View>
    )
  }
}

export default Screen(WineryAccessView, {
  title: '',
  navigatorStyle: NavStyles.subView,
  navigatorButtons: {
    leftButtons: [{
      id: 'backs',
      icon: 'vback',
      type: 'custom',
    }],

    rightButtons: []
  }
})