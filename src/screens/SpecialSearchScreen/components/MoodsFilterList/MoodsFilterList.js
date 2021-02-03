import React from 'react'
import { View, Text, FlatList, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import Moods from 'constants/moods'
import FilterChoice from 'components/FilterChoice'

import styles from './styles'

class MoodsFilterList extends React.Component {

  constructor(props) {
    super(props);
    let moods = _.orderBy(Moods, 'name').map((mood) => {
      return {
        name: mood.label,
        value: mood.value,
        active: false
      }
    });

    this.state = {
      selectedItems: '',
      moods,
    };
  }

  _selectMood = (value) => {
    let moods = _.clone(this.state.moods);
    let selectedItems = ''
    moods.map((v, i) => {
      if (v.value == value) {
        moods[i] = Object.assign({}, moods[i], { active: !moods[i].active });
        selectedItems = moods[i].active ? value : ''
      } else {
        moods[i] = Object.assign({}, moods[i], { active: false });
      }
    })
    this.setState({
      moods,
    })
    this.props.changeValue(selectedItems);
  }

  _buildMoodRow = ({ item }) => {
    return (
      <TouchableOpacity style={styles.varietieItem} onPress={() => { this._selectMood(item.value) }}>
        <Text style={styles.varietieName}>{item.name}</Text>
        {item.active ? <Icon name="md-checkmark" size={16} /> : null}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[styles.card, { flex: 1 }]}>
          <FlatList
            keyExtractor={o => o.value}
            data={this.state.moods}
            style={{ padding: 0 }}
            renderItem={this._buildMoodRow}
          />
        </View>
      </View>
    );
  }
}


export default MoodsFilterList
