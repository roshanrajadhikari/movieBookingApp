import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList
} from 'react-native';
import Booking from './Booking';

const bookingList = [
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
    {   
        bookingId: "S2001",
        movie: "Movie Name",
        seats: 3,
        dateTime: "19/06/2022 18:00"
    },
];

function BookingList(){
    return (
        <View style={styles.container}>
            <FlatList
                data = {bookingList}
                renderItem = {({item,index}) =>{
                    return <Booking movie={item.movie} seats={item.seats} dateTime={item.dateTime} bookingId={item.bookingId}/>;
                }}>
            </FlatList>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 2     
    },
});

export default BookingList;