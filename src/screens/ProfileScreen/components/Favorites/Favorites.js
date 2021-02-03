import React from 'react'
import { FlatList, } from 'react-native'
import I18n from 'react-native-i18n'
import EmptyList from 'components/EmptyList'
import WineCard from 'components/WineCard'

import styles from './styles'

const Favorites = ({ wines, goToWine, goToSearch }) => (
  <FlatList
    data={ wines }
    keyExtractor={ o => o.id }
    style={ styles.viewContainer }
    renderItem={({item}) => (
      <WineCard data={ item } onPress={() => { goToWine(item) }} />
    )}
    ListEmptyComponent={(
      <EmptyList message={ I18n.t('profile.empty_favorites') } onPress={() => goToSearch()} />
    )}
  />
)

export default Favorites
