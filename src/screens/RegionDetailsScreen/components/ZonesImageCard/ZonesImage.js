import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const zonesImg = require('images/locations/zones.png')

class ZonesImage extends React.Component {

    render() {
        let { location } = this.props
        return (
            <View style={styles.imageCard}>
                <Text style={styles.zonesTitle}>Zones</Text>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ marginTop: 10, height: 300 }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }}
                    showsUserLocation={false}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.label}
                    />
                </MapView>
            </View>
        )
    }
}

//<Image style={{ alignSelf: 'center' }} source={ zonesImg }/>

export default ZonesImage