import React, { Component } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, utils } from "theme";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

class PaginationComponent extends Component {
  modalOption = [5, 10, 15, 20];

  render() {
    const {
      data: { pages, loading, page, totalPage },
    } = this.props;
    return (
      <View style={styles.pagination}>
        <View
          style={{
            flex: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            disabled={page == 0}
            onPress={() => this.props._goToPage(0)}
          >
            <View
              style={[
                styles.pages_arrow,
                page == 0 && { backgroundColor: "#ddd" },
              ]}
            >
              <Text style={styles.pageArrowText}>{`<<`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={page == 0}
            onPress={() => this.props._goToPage(page - 1)}
          >
            <View
              style={[
                styles.pages_arrow,
                page == 0 && { backgroundColor: "#ddd" },
              ]}
            >
              <Text style={styles.pageArrowText}>{`<`}</Text>
            </View>
          </TouchableOpacity>
          {pages &&
            pages.map((v) => {
              return (
                <TouchableOpacity
                  disabled={page == v}
                  onPress={() => this.props._goToPage(v)}
                >
                  <View style={styles.pageNumber}>
                    <Text
                      style={[
                        styles.pageNumber,
                        v == page && { color: colors.primaryColor },
                      ]}
                    >
                      {v + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          <TouchableOpacity
            disabled={page == totalPage}
            onPress={() => this.props._goToPage(page + 1)}
          >
            <View
              style={[
                styles.pages_arrow,
                page == totalPage && { backgroundColor: "#ddd" },
              ]}
            >
              <Text style={styles.pageArrowText}>{`>`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={page == totalPage}
            onPress={() => this.props._goToPage(totalPage)}
          >
            <View
              style={[
                styles.pages_arrow,
                page == totalPage && { backgroundColor: "#ddd" },
              ]}
            >
              <Text style={styles.pageArrowText}>{`>>`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Icon
            name="angle-down"
            size={22}
            style={[
              styles.settingsActionIcon,
              { position: "absolute", right: 0, },
            ]}
          />
          <ModalDropdown
            ref={(ref) => (this.dropDown = ref)}
            defaultValue={20}
            disabled={loading}
            style={{
              width: '100%',
              position: "absolute",
              right: 0,
              zIndex: 999,
            }}
            textStyle={{
              fontSize: 15,
              textAlign: "center",
              fontFamily: "Raleway-SemiBold",
              color: "#34404c",
            }}
            dropdownStyle={{ width: 70 }}
            dropdownTextStyle={{
              fontSize: 15,
              fontFamily: "Raleway-Regular",
              color: "#34404c",
            }}
            dropdownTextHighlightStyle={{ color: colors.primaryColor }}
            adjustFrame={(style) => {
              style.top += 40;
              return style;
            }}
            options={this.modalOption}
            onSelect={(idx, value) => {
              this.props.setLimit(value);
            }}
          ></ModalDropdown>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },

  pages_arrow: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
  },

  settingsActionIcon: {
    color: colors.primaryColor,
    paddingLeft: 10,
    alignSelf: "center",
  },

  pageNumber: {
    color: "#000",
    //alignSelf: 'center',
    paddingTop: 3,
  },

  pageArrowText: {
    color: "#fff",
    fontFamily: "Raleway-Bold",
  },
});

export default PaginationComponent;
