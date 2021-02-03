import React from 'react'
import { Modal, View, TouchableOpacity, Text, TextInput, } from 'react-native'
import I18n from 'react-native-i18n'
import { colors } from 'theme'

import styles from './styles'

class ContactModal extends React.Component {

  state = {
    message: '',
  }

  _onChange = (value) => {
    this.setState({
      message : value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && !nextProps.open) {
      this.setState({
        message: ''
      })
    }
  }
  
  render() { 
    const { onSubmit, onClose, open, } = this.props
    let error = {}
    
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={ open }
        onRequestClose={() => {}}>
        <View style={ styles.modalContent }>
          <View style={ styles.modalInnerContent }>
            <Text style={ styles.modalTitle }>{ I18n.t('settings.contact_us') }</Text>

            <View style={ styles.formContainer }>
              <TextInput 
                value={ this.state.message.value} 
                onChangeText={ this._onChange }
                style={[ styles.input , error ]}
                placeholder={ I18n.t('settings.message') }
                placeholderTextColor={ colors.greyMatterhorn }
                multiline={ true } />
            </View>


            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.6} style={[ styles.button, styles.cancelBtn ]} onPress={ onClose }>
                <Text style={ styles.btnTxt }>{ I18n.t('settings.cancel') }</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={ () => { onSubmit(this.state.message) }}
                style={[ styles.button, styles.submitBtn ]}>
                <Text style={ styles.btnTxt }>{  I18n.t('settings.send') }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ContactModal
