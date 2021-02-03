import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colors } from "../../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/Button";
import firebase from '@react-native-firebase/app'

const IMG_WINECLUB = require("../../images/wineclub-logo.png");

class RetailerModal extends React.Component {
  render() {
    const { data, open, onClose, title, itemData } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <View
              style={{
                height: 40,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image style={styles.wineClubIcon} source={IMG_WINECLUB} />
              <TouchableOpacity
                onPress={this.props.onClose}
                style={{
                  width: 28,
                  height: 28,
                  position: "absolute",
                  right: 10,
                  top: -10,
                  marginTop: 0,
                  flex: 1,
                  zIndex: 200,
                }}
              >
                <Icon
                  name="close-circle-outline"
                  size={26}
                  color={colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 25,
                },
              ]}
            >
              {title}
            </Text>

            <ScrollView
              style={{ height: "90%", width: "100%" }}
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: 40,
              }}
            >
              {data &&
                data.map((v) => {
                  return (
                    <View style={styles.cardContainer} elevation={2}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={{
                              uri: `https://s2.googleusercontent.com/s2/favicons?domain_url=${v.url}`,
                            }}
                          />
                        </View>
                        <View style={{ flex: 9 }}>
                          <Text style={styles.retailerName}>
                            {v.retailer ? v.retailer.name : ""}
                          </Text>
                          <Text style={styles.location}>
                            {v.retailer
                              ? "Ships to " + v.retailer.shippingState
                              : ""}
                          </Text>
                        </View>
                      </View>
                      <Button
                        label="Visit Now"
                        labelStyle={{
                          fontSize: 14,
                          lineHeight: 14,
                          textAlign: "center",
                        }}
                        onPress={async () => {
                          // if ((itemData.winery.name == 'Lagarde')) {
                          //   await firebase.analytics().logEvent(itemData.winery.name, { URL: v.url });
                          // }
                          await firebase
                            .analytics()
                            .logEvent("retailer_links", {
                              retailer_url: v.url,
                            });
                          Linking.openURL(v.url).catch((err) => {});
                        }}
                        style={{ height: 38, marginTop: 5 }}
                        rounded
                      />
                    </View>
                  );
                })}
            </ScrollView>
            {/* <Button
              block
              primary
              onPress={this.props.onClose}
              label={I18n.t("close")}
              // close-circle-outline
            /> */}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wineClubIcon: {
    width: 54,
    height: 54,
  },

  title: {
    fontFamily: "Raleway-Regular",
    color: "#34404c",
    fontSize: 18,
    textAlign: "center",
  },

  retailerName: {
    fontFamily: "Raleway-Bold",
    fontSize: 14,
    color: "#34404c",
    marginBottom: 4,
  },

  location: {
    fontFamily: "Raleway-Regular",
    fontSize: 12,
    color: "#34404c",
    marginTop: 0,
    marginBottom: 4,
  },

  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
  },

  cardContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFF",
    marginBottom: 8,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  modalInner: {
    marginHorizontal: 15,
    backgroundColor: "#F5F5F5",
    paddingTop: 0,
    borderRadius: 8,
    height: "90%",
    width: "90%",
    overflow: "hidden",
  },
});

export default RetailerModal;
