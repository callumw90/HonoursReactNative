import React, { Component } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { BackgroundCarousel } from '../components/BackgroundCarousel';

export default function FloorPlan({ navigation }) {

    var  propertyDetails = navigation.dangerouslyGetParent()._childrenNavigation.ItemDetails.state.params.property;
    var images = null;

    if(propertyDetails.floor_plan != null){

        images = propertyDetails.floor_plan;

    } 
    else{

        images = ['http://www.sbgocs.com/images/noimage.jpg'];
    }
    
    //console.log(propertyDetails.displayable_address);

    return (
        <View>
            <BackgroundCarousel images = {images} />
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
});