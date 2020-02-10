import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from 'react-native';


export default function PropertyLocation({ navigation }) {

    var  propertyDetails = navigation.dangerouslyGetParent()._childrenNavigation.ItemDetails.state.params.property;

    //console.log(propertyDetails.displayable_address);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: propertyDetails.latitude,
                    longitude: propertyDetails.longitude,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0221,
                }}
                showsUserLocation={true}
            >
            <MapView.Marker 
                coordinate={{latitude: propertyDetails.latitude,
                    longitude: propertyDetails.longitude }}
                    title= {propertyDetails.displayable_address}
            />
            </MapView>
        </View>
)
}

let { height, width } = Dimensions.get('window');

const styles= StyleSheet.create({

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