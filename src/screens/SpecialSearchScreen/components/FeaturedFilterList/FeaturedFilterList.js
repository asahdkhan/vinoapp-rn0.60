import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'
import PERSONALITIES from 'constants/personalities'
import I18n from 'react-native-i18n'
import FilterChoice from 'components/FilterChoice'
import PersonalityIcon from 'components/PersonalityIcon'

import styles from './styles'

class FeaturedFilterList extends React.Component {

  constructor(props) {
    super(props)
    let personality = _.orderBy(PERSONALITIES, 'name').map((varietie) => {
      return {
        name : varietie.name,
        value: varietie.value,
        active: false
      }
    })

    this.state = {
      selectedItems: [],
      personality: personality,
      varietiesType: 1
    }
  }

  _selectVarietie = (value) => {
    let personality = _.clone(this.state.personality)
    let selectedItems = _.clone(this.state.selectedItems)
    let idx = _.findIndex(personality, { value: value })

    if (personality[idx].active) {
      _.remove(selectedItems, function(n) {
        return n == value
      })
    } else {
      selectedItems.push(value)
    }
    
    personality[idx] = Object.assign({}, personality[idx], { active: !personality[idx].active })

    this.setState({
      selectedItems: _.clone(selectedItems),
      personality : personality,
    }, () =>{
      if(this.state.varietiesType == 1) {
        this.props.changeValue(this.state.selectedItems)
      } else {
        this.props.changeValue(this.state.selectedItems.join(','))
      }
    })
  }

  _buildVarietieRow = ({item}) => {
    return (
      <TouchableOpacity style={ styles.varietieItem } onPress={() =>{ this._selectVarietie(item.value) }}>
        <PersonalityIcon name={ item.value } key={ item.value } width={ 35 } height={ 35 } />
        <Text style={ styles.varietieName }>{ item.name }</Text>
        { item.active ? <Icon name="md-checkmark" size={16} /> : null }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <View style={[ styles.card, { paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, marginBottom: 10 } ]}>
          <FilterChoice 
            choices={[I18n.t('search.at_least_one'), I18n.t('search.all_of_them')]} 
            active={ this.state.varietiesType }
            onChange={ (value) => { 
              this.setState({ varietiesType: value }, () =>{
                if(this.state.varietiesType == 1) {
                  this.props.changeValue(this.state.selectedItems)
                } else {
                  this.props.changeValue(this.state.selectedItems.join(','))
                }
              }) 
            }} 
            style={{ marginBottom: 10 }}/>
        </View>

        <View style={[ styles.card,  {flex: 1}]}>
          <FlatList
            keyExtractor={i => i.value }
            data={ this.state.personality }
            style={{ padding: 0 }}
            renderItem={ this._buildVarietieRow } />
        </View>
      </View>
    )
  }
}

export default FeaturedFilterList
