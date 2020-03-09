import React, { Component } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Alert, Text, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import Sort from '../functions/sort';

export default class Home extends Component {

  state = {
    property: [],
    location: null,
    isLoading: false,
    isRefreshing: false,
  };

  handleRefresh = () => {

    this.setState({

      isRefreshing: true,

    }, () => {
      this.findLocation();
      this.loadProperty();
    });
  };

  findLocation = () => {

    navigator.geolocation.getCurrentPosition(
      position => {


        this.setState({ location: position }, () => {

          this.loadProperty();

        });

      },
      error => Alert.alert(error.message),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  };


  loadProperty = () => {

    const { property } = this.state;

    const lat = this.state.location.coords.latitude;
    const long = this.state.location.coords.longitude;

    this.setState({ isLoading: true });

    fetch('https://api.zoopla.co.uk/api/v1/property_listings.json?latitude=' + lat + '&longitude=' + long + '&radius=10&listing_status=sale&page_size=50&description_style=1&order_by=age&api_key=INSERT_API_HERE')
      .then(res => res.json())
      .then(res => {

        this.setState({

          property: res.listing,

        });
      })
      .catch(err => {

        console.error(JSON.stringify(err));

      })

    this.setState({

      isRefreshing: false,
    });
  };

  UNSAFE_componentWillMount = () => {

    this.findLocation();
  };

  sortList = () => {

    //console.log("Sorting list");
    this.state.property = Sort(this.state.property, 0, this.state.property.length - 1);

    this.forceUpdate();
  }

  // TODO change the navigation stack   
 /* static navigationOptions = {

    headerRight: () => <Button onPress={this.sortList} title="Order by Price" color="white" />
}; */

  render() {

    const { property, isRefreshing } = this.state;

    return (
      <View>
         <Button style={styles.button} onPress={this.sortList} title="Order by Price" color="#0099ff"/>
        <View>
          <FlatList
            style={styles.list}
            data={property}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ItemDetails', { property: item, userLoc: this.state.location })}>
                <ListItem
                  style={styles.item}
                  title={item.displayable_address}
                  subtitle={item.price != 0 ? "£" + item.price : <Text>Price on Request</Text>}
                  leftAvatar={{ rounded: false, source: { uri: item.image_150_113_url } }} />
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

  list: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0099ff',
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
