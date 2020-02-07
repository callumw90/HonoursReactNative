import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export function Header() {

    return(

        <View style={styles.header}>
            <Text style={styles.title}>Property List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: Platform.select({ ios: 44, android: 56 }),
        backgroundColor: '#0099ff',
    },

    title: {
        textAlign: "center",
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})