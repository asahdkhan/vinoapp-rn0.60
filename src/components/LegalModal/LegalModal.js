import React from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import I18n from 'react-native-i18n'
import Button from 'components/Button'

class LegalModal extends React.Component {

  render() {
    const { open, onClose, title } = this.props
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={() => onClose() }
      > 
        <View style={ styles.modalContainer }>
          <View style={ styles.modalInner }>
            <ScrollView style={{ height: 450 }} contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 40, }}>
              <Text style={[styles.title,{ fontSize: 22, marginTop: 25, marginBottom: 20, textAlign: 'center' } ]}>{ title }</Text>
              <Text style={ styles.txt }>Last updated: January 25, 2017</Text>
              <Text style={ styles.txt }>These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with vinoapp.co website and VinoApp mobile application (the "Service") operated by VinoApp ("us", "we", or "our").</Text>
              <Text style={ styles.txt }>Please read these Terms and Conditions carefully before using our website and VinoApp mobile application (the "Service").</Text>
              <Text style={ styles.txt }>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</Text>
              <Text style={ styles.txt }>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</Text>

              <Text style={ styles.title }>Content</Text>
              <Text style={ styles.txt }>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</Text>
              <Text style={ styles.txt }>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.</Text>
              <Text style={ styles.txt }>You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</Text>
            
              <Text style={ styles.title }>Accounts</Text>
              <Text style={ styles.txt }>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</Text>
              <Text style={ styles.txt }>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</Text>
              <Text style={ styles.txt }>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</Text>

              <Text style={ styles.title }>Links To Other Web Sites</Text>
              <Text style={ styles.txt }>Our Service may contain links to third-party web sites or services that are not owned or controlled by VinoApp.</Text>
              <Text style={ styles.txt }>VinoApp has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that VinoApp shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</Text>
              <Text style={ styles.txt }>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</Text>

              <Text style={ styles.title }>Governing Law</Text>
              <Text style={ styles.txt }>These Terms shall be governed and construed in accordance with the laws of Argentina, without regard to its conflict of law provisions.</Text>
              <Text style={ styles.txt }>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and   replace any prior agreements we might have between us regarding the Service.
              </Text>
            
              <Text style={ styles.title }>Changes</Text>
              <Text style={ styles.txt }>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 60 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</Text>

              <Text style={ styles.txt }>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</Text>

              <Text style={ styles.title }>Contact Us</Text>
              <Text style={ styles.txt }>If you have any questions about these Terms, please contact us.</Text>
            </ScrollView>
            <Button block primary onPress={ this.props.onClose } label={ I18n.t('close') } />
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
    marginHorizontal: 15, 
    backgroundColor: '#FFF', 
    paddingTop: 0 ,
    borderRadius: 4,
    height: 450,
    overflow: 'hidden'
  },
})

export default LegalModal
