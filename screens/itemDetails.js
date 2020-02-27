import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function ItemDetails({ navigation }) {

    var propertyDetails = navigation.getParam('property');

    //console.log(navigation);

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: propertyDetails.image_354_255_url }} />
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Address:</Text>
                    <Text style={styles.item}>{propertyDetails.displayable_address}</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Town:</Text>
                    <Text style={styles.item}>{propertyDetails.post_town}</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Price:</Text>
                    <Text style={styles.item}>£{propertyDetails.price}</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Details:</Text>
                    <Text style={styles.item}>£{propertyDetails.description}</Text>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10
    },
    image: {
        width: 235,
        height: 140,
    },
    item: {
        padding: 15,
        fontSize: 15,
    },
});