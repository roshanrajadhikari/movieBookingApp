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
    const movie = props.movie;
    const image = {uri : movie.movieImage};
    const navigation = props.navigation;
    return (
            <View style={styles.container}>
                <Image source={image} style={styles.image}/>
                <Text style={styles.title}>{movie.movieName} </Text>
                <Text style={{color:'black',}}>Rating: {movie.movieRating} / 10</Text>
                <Button onPress={()=>onPressed(movie,props.navigation)} title='Book Now'/>
           </View>
    );
}


const onPressed = (movie,navigation)=>{
    navigation.navigate('bookMovie',{movie : movie});
    //alert("test" + id);
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