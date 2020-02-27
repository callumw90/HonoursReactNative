import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, AsyncStorage, Alert } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

export default function PropertyLocation({ navigation }) {

    var propertyDetails = navigation.dangerouslyGetParent()._childrenNavigation.ItemDetails.state.params.property;
    var userLoc = navigation.dangerouslyGetParent()._childrenNavigation.ItemDetails.state.params.userLoc;

    const origin = {latitude: userLoc.coords.latitude, longitude: userLoc.coords.longitude};
    const destination = {latitude: propertyDetails.latitude, longitude: propertyDetails.longitude};
    //var getLocation;

    //console.log(userLoc);


    // Native Map
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: propertyDetails.latitude,
                    longitude: propertyDetails.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.2,
                }}
                showsUserLocation={true}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: propertyDetails.latitude,
                        longitude: propertyDetails.longitude
                    }}
                    title={propertyDetails.displayable_address}
                />
                <MapViewDirections 
                origin = {origin}
                destination = {destination}
                apikey = {"AIzaSyCd7i6undwT0TthNkDdqOsb5418DgaOpMk"}
                precision = {"high"}
                strokeWidth = {4}
                strokeColor = "#ff3b30"
                />
            </MapView>
        </View>
    )
}

/*getLocation = () => {

    console.log("Getting Location");

    navigator.geolocation.getCurrentPosition(
        position => {
    
            return position;
    
        }, error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});

}*/

/*

*/

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