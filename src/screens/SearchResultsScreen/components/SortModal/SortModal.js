import React from 'react'
import { View, Text, Modal, TouchableOpacity, } from 'react-native'
import I18n from 'react-native-i18n'
import FilterChoice from 'components/FilterChoice'

const ORDER = ['desc', 'asc']

import styles from './styles'

class SortModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      suggestedPrice: -1,
      year: -1,
      rate: -1,
      points : -1,
      name: -1,
      averageScore: -1,
      avgScore: -1,
    }
  }

  _closeModal = () => {
    this.setState({
      open: false
    }, () => {
      if (this.props.onClose) this.props.onClose()
    })
  }

  _onSearch = () => {
    let order = {}

    if (this.props.type === 'vintage') {
      if (this.state.suggestedPrice && this.state.suggestedPrice != -1) {
        order['suggestedPrice'] = this.state.suggestedPrice
      }

      if (this.state.rate && this.state.rate != -1) {
        order['rate'] = this.state.rate
      }

      if (this.state.year && this.state.year != -1) {
        order['year'] = this.state.year
      }
    }

    if (this.props.type === 'wine') {
      if (this.state.name != -1) {
        order['name'] = this.state.name
      }

      if (this.state.averageScore != -1) {
        order['averageScore'] = this.state.averageScore
      }

      if (this.state.avgScore != -1) {
        order['avgScore'] = this.state.avgScore
      }
    }

    this.props.onSearch(order)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      let order = nextProps.order
      let newState = { open: nextProps.open, }

      if (order) {
        newState = { ...newState, ...nextProps.order }
      }

      this.setState(newState)
    }
  }
  
  render() {
    const { open, } = this.state
    const { type, onSelect, onCancel, options, selected={}} = this.props
    
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={() => {}}
        style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[ styles.modalContainer, ]}>
          <View style={[ styles.modalInner,  { maxHeight : type === 'wine' ? 300 : 390 } ]}>
            <Text style={ styles.modalTitle }>{ I18n.t('search.sort_by') }</Text>

            {
              type === 'vintage' &&
                <View>
                  <View style={ styles.row }>
                    <Text style={ styles.label }>Points</Text>
                    <FilterChoice 
                      choices={['desc', 'asc']}
                      showNone={true}
                      noneChoice={'None'}
                      active={ ORDER.indexOf(this.state.rate) }
                      onChange={ (value) => { this.setState({ rate: ORDER[value] }) }} 
                      style={{ marginBottom: 10, marginHorizontal: 15 }}/>
                  </View>

                  <View style={ styles.row }>
                    <Text style={ styles.label }>Year</Text>
                    <FilterChoice 
                      choices={['desc', 'asc']}
                      showNone={true}
                      noneChoice={'None'}
                      active={ ORDER.indexOf(this.state.year) }
                      onChange={ (value) => { this.setState({ year: ORDER[value] }) }} 
                      style={{ marginBottom: 10, marginHorizontal: 15 }}/>
                  </View>

                  <View style={ styles.row }>
                    <Text style={ styles.label }>Suggested Price</Text>
                    <FilterChoice 
                      choices={['desc', 'asc']} 
                      showNone={true}
                      noneChoice={'None'}
                      active={ ORDER.indexOf(this.state.suggestedPrice) }
                      onChange={ (value) => { this.setState({ suggestedPrice: ORDER[value] }) }} 
                      style={{ marginBottom: 10, marginHorizontal: 15 }}/>
                  </View>
                </View>
            }

            {
              type === 'wine' &&
                <View>
                  <View style={ styles.row }>
                    <Text style={ styles.label }>Name</Text>
                    <FilterChoice 
                      choices={['desc', 'asc']} 
                      showNone={true}
                      noneChoice={'None'}
                      active={ ORDER.indexOf(this.state.name) }
                      onChange={ (value) => { this.setState({ name: ORDER[value] }) }} 
                      style={{ marginBottom: 10, marginHorizontal: 15 }}/>
                  </View>

                  <View style={ styles.row }>
                    <Text style={ styles.label }>Average Score</Text>
                    <FilterChoice 
                      choices={['desc', 'asc']} 
                      showNone={true}
                      noneChoice={'None'}
                      active={ ORDER.indexOf(this.state.averageScore) }
                      onChange={ (value) => { this.setState({ averageScore: ORDER[value] }) }} 
                      style={{ marginBottom: 10, marginHorizontal: 15 }}/>
                  </View>
                </View>
            }

            <View style={ styles.modalFooter }>
              <TouchableOpacity
                onPress={ this._onSearch }
                style={[ styles.btn ]}
              >
                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 14 }}>{ I18n.t('search.sort') }</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ this._closeModal }
                style={[ styles.btn ]}
              >
                <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 14 }}>{ I18n.t('cancel') }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default SortModal
