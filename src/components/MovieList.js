import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Card from './Card';
import {API} from 'aws-amplify';

function MovieList(){

    const [movieList, setMovieList] = useState(null);

    //calling api to fetch all the movies
    useEffect(() => {
        API.get('moviesapi','/movies/movieId')
        .then(res => setMovieList(res));
      }, []);

      //while waiting for api to send response we have a loading icon 
    if (movieList === null) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator/>
          </View>
        );
    }

    //when the movie list is done fetching
    return (
        <View style={styles.container}>
            <FlatList
                data = {movieList}
                renderItem = {({item,index}) =>{
                    return <Card title={item.movieName} rating={item.movieRating} imageUrl={item.movieImage} movieId={item.movieId}/>;
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