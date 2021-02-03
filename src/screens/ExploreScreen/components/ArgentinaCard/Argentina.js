import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import argentinaData from './constants'

import styles from './styles'

const argentinaImage = require('images/explore/argentinaCard.jpg');
//const argentinaImage = require('images/dummy/dummy.png');

class ArgentinaCard extends React.Component {

  constructor() {
    super()
    this.state = {
      showArgentinaData: false
    }
  }

  _showArgentinaData = () => {
    if (this.state.showArgentinaData == true) {
      this.setState({
        showArgentinaData: false
      })
    } else {
      setTimeout(() => {
        this.props.scrollView.scrollTo(this.state.sH);
      }, 1)
      this.setState({
        showArgentinaData: true
      })
    }
  }

  goToArgentina = () => {
    this.setState({
      showArgentinaData: false
    })
    this.props.goToArgentina()
  }

  _argentinaDataView = () => {
    return (
      <View
        style={styles.argentinaDataCard}>
        <Text style={styles.argentinaText}>{argentinaData.about1}</Text>
        <Text style={styles.argentinaText}>{argentinaData.about2}</Text>
        <Text style={styles.argentinaText}>{argentinaData.about3}</Text>
        <TouchableOpacity onPress={this.goToArgentina} activeOpacity={0.8}>
          <View style={styles.argentinaButton}>
            <Text style={styles.argentinaLabel}>Learn More</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View onLayout={(event) =>
        this.setState({ sH: event.nativeEvent.layout.y })
      }>
        <View elevation={2} style={[styles.argentinaCard,]}>
          <Text numberOfLines={2} style={styles.postTitle}>Learn About Argentine{"\n"}Vineyards and Wineries</Text>
          <TouchableOpacity onLayout={event => {
            this.sH = event.nativeEvent;
          }} onPress={() => this._showArgentinaData()} activeOpacity={0.8}>
            <Image resizeMode="cover" style={{ flex: 1, width: 100 + '%', height: 220 }} source={argentinaImage} />
          </TouchableOpacity>
        </View>
        {this.state.showArgentinaData ? this._argentinaDataView() : <View></View>}
      </View>
    )
  }

}

export default ArgentinaCard