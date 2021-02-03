import React from 'react'
import { View, Text, FlatList, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import VARIETIES from 'constants/varieties'
import FilterChoice from 'components/FilterChoice'

import styles from './styles'

class VarietiesFilterList extends React.Component {

  constructor(props) {
    super(props);
    let varieties = _.orderBy(VARIETIES, 'name').map((varietie) => {
      return {
        name  : varietie.name,
        value : varietie.value,
        active: false
      }
    });

    this.state = {
      selectedItems: [],
      varieties: varieties,
      varietiesType: 1
    };
  }


  _selectVarietie = (value) => {
    let varieties = _.clone(this.state.varieties);
    let selectedItems = _.clone(this.state.selectedItems);
    let idx = _.findIndex(varieties, { value: value });

    if (varieties[idx].active) {
      _.remove(selectedItems, function(n) {
        return n == value;
      });
    } else {
      selectedItems.push(value)
    }
    
    varieties[idx] = Object.assign({}, varieties[idx], { active: !varieties[idx].active });

    this.setState({
      selectedItems: _.clone(selectedItems),
      varieties : varieties,
    }, () =>{
      if(this.state.varietiesType == 1) {
        this.props.changeValue(this.state.selectedItems);
      } else {
        this.props.changeValue(this.state.selectedItems.join(','));
      }
    })
  }

  _buildVarietieRow = ({ item }) => {
    return (
      <TouchableOpacity style={ styles.varietieItem } onPress={() =>{ this._selectVarietie(item.value) }}>
        <Text style={ styles.varietieName }>{ item.name }</Text>
        { item.active ? <Icon name="md-checkmark" size={16} /> : null }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <View style={[ styles.card, { paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 2, marginBottom: 10 } ]}>
          <FilterChoice 
            choices={[I18n.t('search.at_least_one'), I18n.t('search.all_of_them')]} 
            active={ this.state.varietiesType }
            onChange={ (value) => { 
              this.setState({ varietiesType: value }, () =>{
                if(this.state.varietiesType == 1) {
                  this.props.changeValue(this.state.selectedItems);
                } else {
                  this.props.changeValue(this.state.selectedItems.join(','));
                }
              }); 
            }} 
          style={{ marginBottom: 10 }}/>
        </View>

        <View style={[ styles.card,  {flex: 1}]}>
          <FlatList
            keyExtractor={ o => o.value }
            data={ this.state.varieties } 
            style={{ padding: 0 }}
            renderItem={ this._buildVarietieRow }
          />
        </View>
      </View>
    );
  }
}


export default VarietiesFilterList
