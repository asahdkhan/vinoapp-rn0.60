import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import I18n from "react-native-i18n";
import Button from "components/Button";

class CoreModal extends React.Component {
  render() {
    const { open, onClose, title } = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <ScrollView
              style={{ height: 320 }}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 30,
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 22,
                    marginTop: 25,
                    marginBottom: 20,
                    textAlign: "center",
                  },
                ]}
              >
                Developer Profile
              </Text>
              <Text style={styles.txt}>
                Are you enjoying the app? This is developed by Asad Khan. Here
                are some info. about the developer
              </Text>
              <Text style={styles.txt}>
                {`            
                Name ~ Asad Khan
                DOB ~ 9th Sep. 1994
                Email ID ~ asadkhan086@gmail.com
               `}
              </Text>
              <Text style={styles.txt}>Feel free to reach out :) </Text>
              <Text style={[styles.txt, { fontSize: 16 }]}>Â̸͈̩̪̱͕̗̫̆̄̍̀̚͠s̵̡̨̹̺̝̞̭̹̅̏̀̄̎͒a̵̡̧͙̪̹͚̯̿̾̉͜d̶̡̼̐̌̓͆̚͝ ̷̯͔͛̃͛́̃̔̇̚̕͝K̷̭̖͚͌̒̿̎̀̚h̶̖̳̠̩͈͊̈̊̽͆͊͗̃͘͝a̷̢̡̨̱͓̦̗̓n̵̖͈̼̲̱̟͑͐͒̃͆̏̇̇͝͠</Text>
            </ScrollView>
            <Button
              block
              primary
              onPress={this.props.onClose}
              label={I18n.t("close")}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Raleway-Bold",
    fontSize: 16,
    color: "#34404c",
    marginBottom: 8,
    marginTop: 30,
  },

  txt: {
    fontFamily: "Raleway-Bold",
    color: "#34404c",
    fontSize: 14,
    marginBottom: 5,
  },

  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
  },

  modalInner: {
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    paddingTop: 0,
    borderRadius: 4,
    height: 320,
    overflow: "hidden",
  },
});

export default CoreModal;
