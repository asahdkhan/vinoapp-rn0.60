import React from 'react'
import { View, Text, } from 'react-native'
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit'
import { colors } from 'theme'

const Loading = () => (
  <View style={{ minHeight: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner
      isVisible={true}
      size={30}
      type={'Bounce'}
      color={colors.primaryColor}
    />
    <Text style={{ marginTop: 10, textAlign: 'center', color: '#777'}}>
      { I18n.t('loading') }
    </Text>
  </View>
)

export default Loading
