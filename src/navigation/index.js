import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import MovieListScreen from '../screens/MovieListScreen';
import BookingListScreen from '../screens/BookingListScreen'; 
import AccountScreen from '../screens/AccountScreen';

//Screen Names
const movieListName = 'Movie List';
const bookingListName = 'Bookings';
const accountName = 'Account';

const Tab = createBottomTabNavigator();


function Index(){
    return (
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName={movieListName}
            screenOptions={
              ({ route }) => ({
                tabBarActiveTintColor : 'orange',
                tabBarInactiveTintColor : 'grey',
                tabBarLabelStyle : {paddingBottom : 10, fontSize: 10},
                tabBarStyle : {padding: 10, height: 70},
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
    
                if (rn === movieListName) {
                  iconName = focused ? 'film' : 'film-outline';
    
                } else if (rn === bookingListName) {
                  iconName = focused ? 'bookmarks' : 'bookmarks-outline';
    
                } 
                else if (rn === accountName) {
                    iconName = focused ? 'person' : 'person-outline';
                  }else{
                    iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                  }
               // console.log(color);
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color}/>;
              }
            })
          }>
    
            <Tab.Screen name={movieListName} component={MovieListScreen} />
            <Tab.Screen name={bookingListName} component={BookingListScreen} />
            <Tab.Screen name={accountName} component={AccountScreen} />

          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default Index;