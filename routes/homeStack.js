import React from 'react';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ItemDetails from '../screens/itemDetails';
import HomeScreen from '../screens/home';
import PropertyLocation from '../screens/propertyLocation';
import FloorPlan from '../screens/floorPlan';
import PropertyMap from '../screens/propertyMap';

const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
        return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}

const TabNavigator = createBottomTabNavigator({
    ItemDetails: {
        screen: ItemDetails,
        navigationOptions: {
            title: 'Property Details',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            headerBackTitle: 'Back',
            tabBarIcon: <Icon name='home'/>
        }
    },
    FloorPlan: {
        screen: FloorPlan,
        title: 'Floor Plan',
        navigationOptions: {
            title: 'Floor Plan',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            HeaderTitle: 'Floor Plan',
            tabBarIcon: <Icon name='image'/>
        }
    },
    PropertyLocation: {
        screen: PropertyLocation,
        navigationOptions: {
            title: 'Location',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            HeaderTitle: 'Location',
            tabBarIcon: <Icon name='navigation'/>
        }
    },
});

const HomeTabNavi = createBottomTabNavigator({
    PropertyList:{
        screen: HomeScreen,
        title: 'Property List',
        navigationOptions:{
            title: 'Property List',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            tabBarIcon: <Icon name='list' />
        }
    },
    PropertyMap: {
        screen: PropertyMap,
        title: 'Property Map',
        navigationOptions:{
            title: 'Property Map',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            tabBarIcon: <Icon name='map' />
        }
    }
});

const NavStack = createStackNavigator({
    Home: {
        screen: HomeTabNavi,
        navigationOptions: {
            title: 'Property List',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
        },
    },
    TabNavi: {
        screen: TabNavigator,
        navigationOptions: {
            headerStyle: { backgroundColor: '#0099ff'},
            title: 'Property Details',
            headerTintColor: 'white',
            headerBackTitle: 'Back'
        },
    },
});

const App = createAppContainer(NavStack);

export default App;