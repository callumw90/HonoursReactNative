import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends Component <{}> {

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

  /*handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadProperty();
    });
  };*/

  componentDidMount = () => {

    this.loadProperty();
  };

  loadProperty = () => {
    
    const { property } = this.state;
    this.setState({ isLoading: true });

    fetch('https://api.zoopla.co.uk/api/v1/property_listings.json?postcode=ky11&listing_status=sale&page_size=50&api_key=bmm77zppverakbnfnmtyuky3')
    .then( res => res.json())
    .then ( res => {
      this.setState({
        property: res.listing
      });
    })
    .catch(err => {
      console.error(err);
    })
  };

  render() {
  
    const { property, isRefreshing } = this.state;

return(
      <FlatList 
      style = { styles.item } 
      data = { property } 
      renderItem= {( { item } ) => (

        <ListItem
          title = {item.displayable_address}
          subtitle = {item.price}
          leftAvatar={{ source: {uri: item.image_150_113_url} }}
        />
      )}
      keyExtractor = { i => i.listing_id }
      refreshing = {isRefreshing}
      onRefresh = {this.handleRefresh}
      onEndReached = {this.loadProperty}
      onEndReachedThreshold = {0}
      />
    )
  }

}

const styles = StyleSheet.create({

  scene: {
    flex: 1,
    paddingTop: 25,
  },

  container: {
   flex: 1,
   paddingTop: 22
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
