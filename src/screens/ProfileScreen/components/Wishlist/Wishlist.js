import React from 'react'
import { FlatList, } from 'react-native'
import I18n from 'react-native-i18n'
import EmptyList from 'components/EmptyList'
import VintageCard from 'components/VintageCard'

import styles from './styles'

const Wishlist = ({ vintages, goToVintage, goToSearch }) => (
  <FlatList
    data={ vintages }
    keyExtractor={ o => o.id }
    style={ styles.viewContainer }
    renderItem={({item}) => {
      return (
        <VintageCard data={ item } onPress={() => goToVintage(item) } />
      )
    }}
    ListEmptyComponent={(
      <EmptyList message={ I18n.t('profile.empty_wishlist') } onPress={() => goToSearch()} />
    )}
  />
)

export default Wishlist
