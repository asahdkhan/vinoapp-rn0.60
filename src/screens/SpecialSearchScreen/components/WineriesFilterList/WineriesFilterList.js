import React from 'react'
import { TouchableOpacity, View, Text, FlatList, TouchableOpacit, } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from 'theme'
import modules from 'modules'

const actions = modules.actions.winery

import styles from './styles'

class WineriesFilterList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedItems: []
    }
  }

  componentWillMount() {
    if (!this.props.wineries || this.props.wineries.length == 0) {
      this.props.getAll()
    }
  }

  getValues() {
    return this.state.selectedItems
  }

  _selectItem = (value) => {
    let items = _.clone(this.props.wineries)
    let idx = _.findIndex(items, { id: value })
    if (this.state.selectedItems[0] == value) {
      items[idx] = Object.assign({}, items[idx], { active: false })
    } else {
      items[idx] = Object.assign({}, items[idx], { active: true })
    }

    this.setState({
      selectedItems: this.state.selectedItems[0] == value ? [] : [value],
    }, () => {
      this.props.changeValue(this.state.selectedItems)
    })
  }

  _goToWinery(winery) {
    this.props.checkWinery(winery)
  }

  _buildWineryRow = ({ item, }) => {
    let active = this.state.selectedItems.indexOf(item.id) > -1

    return (
      <TouchableOpacity style={styles.wineryItem} onPress={() => { this._selectItem(item.id) }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.varietieName}>{item.name}</Text>
          <Text style={[styles.varietieName, { fontSize: 12, marginTop: 5, color: '#777' }]}>
            {item.state ? item.state.name : '-'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => { this._goToWinery(item) }}>
          <Text style={styles.linkMore}>{I18n.t('view')}+</Text>
        </TouchableOpacity>
        {
          active ?
            <Icon name="md-checkmark" size={16} color={colors.primaryColor} /> :
            <View style={styles.placeholder} />
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { loading, wineries, } = this.props

    return (
      <View style={styles.card}>
        {
          loading ?
            <View style={{ minHeight: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                isVisible={true}
                size={30}
                type={'Bounce'}
                color={colors.primaryColor}
              />
              <Text style={{ marginTop: 10, textAlign: 'center', color: '#777' }}>
                {I18n.t('loading')}
              </Text>
            </View> :
            <FlatList
              keyExtractor={w => w.id}
              style={{ padding: 0 }}
              data={wineries}
              renderItem={this._buildWineryRow}
            />
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(actions.getAll()),
})

const mapStateToProps = ({ winery, }) => ({
  wineries: winery.data,
  loading: winery.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(WineriesFilterList)
