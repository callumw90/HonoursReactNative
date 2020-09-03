import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import Sort from '../functions/sort'

export default class PropertyMap extends Component {

    state = {
        property: [],
        location: null,
    };

    findLocation = () => {

        navigator.geolocation.getCurrentPosition(
            position => {

                this.setState({ location: position }, () => {

                    this.loadProperty();

                });
            },
            error => Alert.alert(error.message),

            { enableHighAccuracy: true, timeout: 20000 }
        );

    };


    loadProperty = () => {

        const { location } = this.state;

        const lat = location.coords.latitude;
        const long = location.coords.longitude;


        fetch('https://api.zoopla.co.uk/api/v1/property_listings.json?latitude=' + lat + '&longitude=' + long + '&radius=10&listing_status=sale&page_size=50&description_style=1&order_by=age&api_key=')
            .then(res => res.json())
            .then(res => {

                this.setState({
                    property: res.listing,
                });
            })
            .catch(err => {

                console.error(JSON.stringify(err));

            })

            //this.forceUpdate();
    };

    componentDidMount = () => {

        this.findLocation();

    };

    render() {

        const { property, location } = this.state;

        console.log(location);
        //console.log(property);

        if(location !== null){
            return (

                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        mapType={"hybrid"}
                        region={{
                            latitude: 56.0635,
                            longitude: -3.42372,
                            latitudeDelta: 2,
                            longitudeDelta: 0.021,
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                        {property.map(marker => (
                            <Marker 
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            key = {marker.listing_id}
                            title = {marker.displayable_address}
                            onPress={() => this.props.navigation.navigate('ItemDetails', { property: marker, userLoc: this.state.location })}
                            />
                        ))}
                    </MapView>
                </View>
            );
        }
        else {
            return(

            <View  style={styles.container}>
                

            </View>
            );
        }

            
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        padding: 24,
        alignItems: "center",
        height: height,
        width: width
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
