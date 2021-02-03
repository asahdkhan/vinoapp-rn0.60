import React from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import Button from 'components/Button'
import RaitingBar from 'components/RaitingBar'
import { colors } from 'theme'

import styles from './styles'

class RateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      rate: props.rate,
      comment: ''
    }
  }

  _onChangeValue = (value) => {
    this.setState({ comment: value, })
  }

  _sendRate = () => {
    this.props.onRate(this.state.rate, this.state.comment)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
      rate: nextProps.rate,
      comment: ''
    })
  }


  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.open}
        onRequestClose={() => {}}>
        <View style={ styles.modalContainer }>
          <View style={ styles.modalInner }>
            <View style={ styles.rateContainer }>
              <RaitingBar 
                raiting={ this.state.rate } 
                size={35} active={ true } 
                onSetRate={(rate) => { this.setState({ rate: rate })  }} />
            </View>

            <TextInput 
              style={ styles.commentBox } 
              multiline={ true }
              autoFocus={true}
              onChangeText={ this._onChangeValue }
              value={ this.state.comment }
              underlineColorAndroid={ 'rgba(0,0,0,0)'}/>

            <View style={ styles.modalFooter }>
              <TouchableOpacity
                onPress={ this._sendRate }
                style={[ styles.btn ]}
              >
              <Text>{ I18n.t('wine.rate_it') }</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ () => { this.props.onClose() }}
                style={[ styles.btn ]}
              >
              <Text>{ I18n.t('cancel') }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default RateModal
