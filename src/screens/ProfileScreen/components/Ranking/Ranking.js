import React from 'react'
import I18n from 'react-native-i18n'
import { View, FlatList, Text, TouchableOpacity, } from 'react-native'
import _ from 'lodash'

import styles from './styles'

class Ranking extends React.Component {

  _renderItem = ({item, index }) => {
    if (item.wine && item.vintage) {
      return (
        <TouchableOpacity
          key={ 'ranking-' + index }
          style={ styles.box}
          onPress={() => { this.props.goToWine(item.wine)}}
        >
          <View style={ styles.position }>
            <Text>{ index + 1 }</Text>
          </View>
      
          <View style={{ flex: 1, paddingLeft: 12.5 }}>
            <Text numberOfLines={1} style={ styles.wineName }>
              { item.wine.name } { item.vintage.year }
            </Text>
          </View>

          {/*<View>
            <RaitingBar raiting={ item.points } />
          </View>*/}
        </TouchableOpacity>
      )
    } else {
      return <View></View>
    }
  }

  render() {
    const { rates } = this.props
    const data = _.slice(_.orderBy(rates, 'points', 'desc'), 0, 10)

    return (
      <View style={ styles.viewContainer }>
        <Text style={ styles.title }>TOP 10</Text>
        <FlatList
          data={ data }
          keyExtractor={ o => o.id }
          renderItem={ this._renderItem }
          style={{ flex: 1, }}
          contentContainerStyle={{ marginBottom: 50, }}
          ListEmptyComponent={(
            <View style={{ margin: 10}}>
              <Text style={{ textAlign: 'center', color: '#999', fontSize: 11, marginTop: 10 }}>
                { I18n.t('profile.empty_ranking') }
              </Text>
            </View>
          )}
        />
      </View>
    )
  }
}

export default Ranking