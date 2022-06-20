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
import Card from './Card';

const movieList = [
    {   
        movieId: 1,
        title: "Movie Name",
        rating: "7/10",
        imageUrl: "https://dummyimage.com/600x200/ba2fba/fff.jpg"
    },
    {   
        movieId: 2,
        title: "Movie Name Two",
        rating: "9/10",
        imageUrl: "https://dummyimage.com/600x200/ffff0a/fff.jpg"
    }
];

function MovieList(){
    return (
        <View style={styles.container}>
            <FlatList
                data = {movieList}
                renderItem = {({item,index}) =>{
                    return <Card title={item.title} rating={item.rating} imageUrl={item.imageUrl} movieId={item.movieId}/>;
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

export default MovieList;