import React from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import I18n from 'react-native-i18n'
import Button from 'components/Button'

class ReviewModal extends React.Component {

  render() {
    const { open, onClose, title } = this.props
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 40, }}>
              <Text style={[styles.title, { fontSize: 22, marginTop: 25, marginBottom: 20, textAlign: 'center' }]}>{title}</Text>
              <Text style={styles.txt}>Are you enjoying the app? Please share with others by leaving a review in the app store!</Text>
            </ScrollView>
            <Button block primary onPress={this.props.onClose} label={I18n.t('close')} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: '#34404c',
    marginBottom: 8,
    marginTop: 30
  },

  txt: {
    fontFamily: 'Raleway-Regular',
    color: '#34404c',
    fontSize: 13,
    marginBottom: 5
  },

  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
  },

  modalInner: {
    height: 219,
    marginHorizontal: 15,
    width: '75%',
    backgroundColor: '#FFF',
    paddingTop: 0,
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default ReviewModal
