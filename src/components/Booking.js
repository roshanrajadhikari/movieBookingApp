import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function Booking(props){
    return (
            <View style={styles.container}>
                <Text>Booking ID: {props.bookingId}</Text>
                <Text>Movie: {props.movie}</Text>
                <Text>Seats: {props.seats}</Text>
                <Text>Date/Time: {props.dateTime}</Text>
           </View>
    );
}

//styles for booking
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#00000f',
        marginBottom:25,
    },

});

export default Booking;