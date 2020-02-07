import React from 'react';
import { createStackNavigator, HeaderTitle, HeaderBackButton } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import ItemDetails from '../screens/itemDetails';
import HomeScreen from '../screens/home';
import PropertyLocation from '../screens/propertyLocation';

const NavStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Property List',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
        },
    },
    ItemDetails: {
        screen: ItemDetails,
        navigationOptions: {
            title: 'Property Details',
            headerStyle: { backgroundColor: '#0099ff'},
            headerTintColor: 'white',
            headerBackTitle: 'Back'
        }
    },
});

const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
        return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}

const TabNavigator = createBottomTabNavigator({
    NaviStack: {
        screen: NavStack,
        navigationOptions: {
            title: 'Details'
        }
    },
    PropertyLocation: {
        screen: PropertyLocation,
        navigationOptions: {
            title: 'Location'
        }
    },
});

const App = createAppContainer(TabNavigator);

export default App;