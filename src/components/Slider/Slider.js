import React from 'react'
import { View, Text, Animated, Platform } from 'react-native'
import Slider from 'react-native-slider'
import ViewOverflow from 'react-native-view-overflow'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { colors } from 'theme'

import styles from './styles'
import CustomMarker from './CustomMarker';
import CustomMarker1 from './CustomMarker1'


const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);

/**
 * Custom Slider component to select a number value from a determinated range
 * @prop {Integer} max
 * @prop {Integer} min
 * @prop {Integer} value
 * @prop {Integr} step
 * @prop {String} unit
 * @prop {Fun} onChange
 */
class VSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: [props.value[0], props.value[1]],
      sliderWidth: 0,
      posAnima1: new Animated.Value(props.value[0] ? props.value[0]: 0), // gte
      posAnima2: new Animated.Value(props.value[1] ? props.value[1]: 0), // lte
      swiping1: false,  
      swiping2: false,
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if ()
  // }

  _onLayout = (evt) => {
    this.setState({
      sliderWidth: evt.nativeEvent.layout.width - 15
    })
  }

  _onToggleSwipe = (swiper, values) => {             // triggetr onFinish
    const { onChange, onFinish } = this.props
    if (!swiper) {
      this.setState({
        swiping1: false,
        swiping2: false,
      })
    } else {
      this.setState({
        [swiper]: swiping, 
      })
    }

    onChange(values)
    onFinish? onFinish(values): {}
  }

  _onChange = (values) => {             // trigger onChange
    const { sliderWidth, posAnima1, posAnima2, swiping1, swiping2, } = this.state
    const { value, onChange, hideAnima, onFinish } = this.props

    if (!hideAnima && value[0] !== values[0]) {
      if (!swiping1) {
        this.setState({ swiping1: true, })
      }
      posAnima1.setValue(values[0])  
    }

    if (!hideAnima && value[1] !== values[1]) {
      if (!swiping2) {
        this.setState({ swiping2: true, })
      }
      posAnima2.setValue(values[1])
    }
    
    this.setState({
      values: values
    })
    onFinish ? onChange(values) : {}
  }
  
  render() {
    const { sliderWidth, posAnima1, posAnima2, swiping1, swiping2, } = this.state
    const { division, min, max, step, value, onChange, unit, showMaxMin, suffix='', hideLabels, newMarker, minLabel, maxLabel } = this.props
    const divisionTop = Platform.OS === 'ios' ? 11 : 9

    let valuePos1 = sliderWidth ? posAnima1.interpolate({
      inputRange: [min, max],
      outputRange: [0, sliderWidth],
    }) : 0

    let valuePos2 = sliderWidth ? posAnima2.interpolate({
      inputRange: [min, max],
      outputRange: [0, sliderWidth],
    }) : 0

    var sW = sliderWidth / 5; 

    return (
      <ViewOverflow style={ styles.viewContainer }>
        {
          showMaxMin &&
            minLabel ? 
            <Text style={[ styles.label, { marginRight: 20 } ]}>{`${minLabel}`}</Text> :
            <Text style={[ styles.label, { marginRight: 20 } ]}>{`${min} ${unit}`}</Text>
        }
        <ViewOverflow style={{ marginLeft: 5, marginRight: 5, flex: 1, height: 40, alignItems: 'center', }} onLayout={ this._onLayout }>  
          <View style={{ height: 40, overflow: 'visible', zIndex: 10, alignItems: 'center', paddingTop: 20, }}>
            <MultiSlider
              min={min}
              max={max}
              step={step}
              values={value}
              //values={ this.state.values }
              sliderLength={sliderWidth}
              onValuesChangeFinish={(values) => { this._onToggleSwipe(false, values) }}
              onValuesChange={ this._onChange }
              selectedStyle={{ backgroundColor: colors.primaryColor }}
              unselectedStyle={{ backgroundColor: '#34404c' }}
              style={{ backgroundColor: '#34404c'}}
              trackStyle={{ height: 1 }}
              touchDimensions={{
                height: 50,
                width: 50,
              }}
              allowOverlap={true}
              snapped={true}
              customMarker={newMarker? CustomMarker1 :  CustomMarker}
            />
          </View>
    
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: 5 }}>
            <Text>|</Text>
          </ViewOverflow>}
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: sW + 5 }}>
            <Text>|</Text>
          </ViewOverflow>}
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: sW * 2 + 5 }}>
            <Text>|</Text>
          </ViewOverflow>}
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: sW * 3 + 5}}>
            <Text>|</Text>
          </ViewOverflow>}
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: sW * 4 + 5}}>
            <Text>|</Text>
          </ViewOverflow>}
          {division && <ViewOverflow style={{ position: 'absolute', top: divisionTop, left: sW * 5 + 5 }}>
            <Text>|</Text>
          </ViewOverflow>}
        
          <AnimatedViewOverflow 
            style={[
              { left: valuePos1, },
              styles.valueContainer,
              swiping1 && styles.valueContainerActive,
            ]}
          >
            <Text 
              style={ swiping1 ? 
                  styles.valueTextActive : 
                  styles.valueText 
              }
            >
              { 
                (!hideLabels || swiping1) &&
                  `${ unit }${ this.state.values[0] }${ suffix }`
              }
            </Text>
            { 
              swiping1 && <View style={ styles.triangle } />
            }
          </AnimatedViewOverflow>

          <AnimatedViewOverflow 
            style={[
              { left: valuePos2, },
              styles.valueContainer,
              swiping2 && styles.valueContainerActive,
            ]}
          >
            <Text 
              style={ swiping2 ? 
                  styles.valueTextActive : 
                  styles.valueText 
              }
            >
            { 
              (!hideLabels || swiping2) &&
                `${ unit }${ this.state.values[1] }${ suffix }`
            }
            </Text>
            { 
              swiping2 && <View style={ styles.triangle } />
            }
          </AnimatedViewOverflow>
        </ViewOverflow>
        { 
          showMaxMin &&
            maxLabel ? 
            <Text style={[ styles.label, { marginLeft: 20 } ]}>{`${maxLabel}`}</Text> :
            <Text style={[ styles.label, { marginLeft: 20 } ]}>{`${max} ${unit}`}</Text>
        }
      </ViewOverflow>
    )
  }
}

VSlider.defaultProps = {
  unit: '',
  showMaxMin: true,
}

export default VSlider
