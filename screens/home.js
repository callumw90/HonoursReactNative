import React, { Component } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Home extends Component {

    state = {
      property: [],
      isLoading: false,
      isRefreshing: false,
    };
  
    handleRefresh = () => {
      this.setState({
        isRefreshing: true,
      }, () => {
        this.loadProperty();
      });
    };
  
    loadProperty = () => {
  
      const { property } = this.state;
      this.setState({ isLoading: true });
  
      fetch('https://api.zoopla.co.uk/api/v1/property_listings.json?postcode=ky11&listing_status=sale&page_size=50&api_key=bmm77zppverakbnfnmtyuky3')
        .then(res => res.json())
        .then(res => {
          this.setState({
            property: res.listing,
          });
        })
        .catch(err => {
          console.error(err);
        })
  
        this.setState({
  
          isRefreshing: false,
        });
    };
  
    componentDidMount = () => {
      this.loadProperty();
    };
  
    render() {

      const { property, isRefreshing } = this.state;
  
      return (
        <View>
        <View>
        <FlatList
        style={styles.list}
          data={property}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ItemDetails', {property: item})}>
            <ListItem
              style={styles.item}
              title={item.displayable_address}
              subtitle={"£" + item.price}
              leftAvatar={{ rounded: false, source: { uri: item.image_150_113_url }}}/>
            </TouchableOpacity>
          )}
          keyExtractor={i => i.listing_id}
          refreshing={isRefreshing}
          onRefresh={this.handleRefresh}
        />
        </View>
        </View>
      );
    }
  
  }
  
  const styles = StyleSheet.create({
  
    list:{
      backgroundColor: 'white',
    },
    container: {
      backgroundColor: 'transparent',
      paddingTop: 22,
      paddingHorizontal: 20,
    },
    item: {
      flex: 1,
      padding: 15,
      marginTop: 16,
      borderColor: '#bbb',
      borderStyle: "solid",
      borderBottomWidth: 2,
      fontSize: 20,
    },
  })
  