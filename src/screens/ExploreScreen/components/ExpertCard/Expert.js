import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper';

import { colors } from 'theme'
import { expertData } from './constants'

import styles from './styles'

class ExpertCard extends React.Component {
   constructor() {
      super();
      this.state = {
         showExpertDetails: false,
         expertDetailsIndex: null,
      }
   }

   _showExpertDetails = (i) => {
      if (this.state.showExpertDetails == true && this.state.expertDetailsIndex == i) {
         this.setState({
            showExpertDetails: false,
            expertDetailsIndex: null,
         })
      }
      else if (this.state.showExpertDetails == true && this.state.expertDetailsIndex != i) {
         this.setState({
            showExpertDetails: true,
            expertDetailsIndex: i,
         })
      } else {
         this.setState({
            showExpertDetails: true,
            expertDetailsIndex: i,
         })
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.tabUnmount !== this.props.tabUnmount) {
         this.setState({
            showExpertDetails: false,
            expertDetailsIndex: null,
         })
      }
   }

   _expertView = (start, end) => expertData.map((data, i) => {
      if (i >= start && i < end) {
         return (
            <View style={[styles.sliderSection,]}>
               <TouchableOpacity style={[styles.secImage,]} onPress={() => this._showExpertDetails(i)} activeOpacity={0.8}>
                  <View><Image resizeMode="cover" height={100} style={[styles.secImage, this.state.expertDetailsIndex == i ? { borderWidth: 3, borderColor: colors.primaryColor, } : { borderWidth: 3, borderColor: '#FFF' }]} source={data.img} /></View>
               </TouchableOpacity>
               <Text style={styles.secText} numberOfLines={2} >{data.name}</Text>
            </View>
         )
      }
   })


   _expertDetailsView = (i) => {
      return (
         <View style={styles.expertDetailsCont}>
            <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
               <Text style={[styles.expertDescLabels, {}]}>{expertData[i].bio}</Text>
            </View>
         </View>
      )
   }

   _onMomentumScrollEnd = (e, state, context) => {
   }

   render() {
      const { width, height } = Dimensions.get('window');
      return (
         <View>
            <View style={[styles.expertsCard, styles.shadow, this.state.showExpertDetails ? { height: 310 } : { height: 210 }]}>
               <Text style={styles.postTitle}>Meet the Experts</Text>
               <Swiper
                  ref={ref => this.swiper = ref}
                  style={styles.swiperWrapper}
                  dot={<View style={{ backgroundColor: '#9b9b9b', width: 6, height: 6, borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 0, marginBottom: 0 }} />}
                  activeDot={<View style={{ backgroundColor: 'red', width: 6, height: 6, borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 0, marginBottom: 0 }} />}
                  paginationStyle={{ position: 'absolute', bottom: 10 }}
                  loop={true}
                  onIndexChanged={idxActive => {
                     this.setState({
                        showExpertDetails: false,
                        expertDetailsIndex: null,
                     })
                  }}
               >
                  <View style={{ flex: 1, }}>
                     <View style={[styles.slider, {}]}>
                        {this._expertView(0, 3)}
                     </View>
                     {
                        this.state.showExpertDetails
                        &&
                        <ScrollView nestedScrollEnabled={true} style={[styles.expertAddOn, { flex: 1, marginBottom: 20 }]}>
                           {this._expertDetailsView(this.state.expertDetailsIndex)}
                        </ScrollView>
                     }

                  </View>
                  <View style={{ flex: 1, }}>
                     <View style={[styles.slider,]}>
                        {this._expertView(3, 6)}
                     </View>
                     {
                        this.state.showExpertDetails
                        &&
                        <ScrollView nestedScrollEnabled={true} style={[styles.expertAddOn, { flex: 1, marginBottom: 20 }]}>
                           {this._expertDetailsView(this.state.expertDetailsIndex)}
                        </ScrollView>
                     }
                  </View>
               </Swiper>
            </View>
         </View>
      )
   }
}

export default ExpertCard
