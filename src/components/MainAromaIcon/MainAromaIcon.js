import React from 'react'
import { View, Text, Image, TouchableOpacity, Modal, } from 'react-native'
import _ from 'lodash'
import I18n from 'react-native-i18n'
import Button from 'components/Button'
import { AROMAS_ICONS, MAIN_AROMAS_TEXT, AROMAS_LABEL } from 'constants/aromas'
import { colors } from 'theme'

import styles from './styles'

class MainAromaIcon extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      modalOpen : false
    }
  }

  _showInfo = () => {
    if (this.props.name) {
      this.setState({ modalOpen: true })
    }
  }

  _closeModal() {
    this.setState({ modalOpen: false })
  }

  render() {
    let lang = I18n.locale.substr(0,2)
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={ this._showInfo } style={[ styles.aroma, this.props.style ]}>  
        {/* { this.props.name ? 
          <Text style={ styles.aromaCount}>{ this.props.count }</Text> : null
        } */}
        <View style={ styles.aromaIcon}>
          <Image source={ AROMAS_ICONS[this.props.name] } width={34} height={34} style={{ width: 34, height: 34 }}/>
        </View>
        <Text style={ styles.aromaName}>
          { _.capitalize(AROMAS_LABEL[lang][this.props.name]) }
        </Text>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalOpen}
          onRequestClose={() => {}}
        >
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View style={{ margin: 15, backgroundColor: '#FFF', paddingHorizontal: 25, paddingVertical: 30, borderRadius: 4, }}>
              <Text style={{ fontSize:16.5, fontFamily: 'Raleway-Regular', color: colors.primaryColor, marginBottom: 5, paddingTop: 10, position: 'relative', textAlign: 'center' }}>
                { _.capitalize(AROMAS_LABEL[lang][this.props.name]) }
              </Text>
              <Text style={{ fontSize: 14, color: '#34404c', fontFamily: 'Raleway-Regular', marginBottom: 25, marginTop: 10, textAlign: 'center' }}>
                { MAIN_AROMAS_TEXT[lang][this.props.name] }
              </Text>

              <Button
                onPress={ () => { this.setState({modalOpen: false}) }}
                style={{ marginLeft: 80, marginRight: 80, height: 30}}
                rounded={true}
                label={ I18n.t('close') }
                labelStyle={{ fontSize: 14, lineHeight: 14, }}/>  
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default MainAromaIcon
