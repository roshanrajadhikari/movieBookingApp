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


function Card(props){
    const image = {uri : props.imageUrl};
    return (
            <View style={styles.container}>
                <Image source={image} style={styles.image}/>
                <Text style={styles.title}>{props.title}</Text>
                <Text>Rating: {props.rating}</Text>
                <Button onPress={pressedBook} title='Book Now'/>
           </View>
    );
}

const pressedBook = (id) => {
    alert("test");
}

//styles for card
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#00000f',
        marginBottom:25,
    },
    image: {
        width: undefined,
        height: 150,
        padding: 20,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    title: {
        flex: 0,
        flexDirection: 'row',
        fontSize: 26,
        fontWeight: '500',
        color:'orange',
    }
});

export default Card;