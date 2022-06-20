import * as React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieList from '../../components/MovieList';

function MovieListScreen(navigation){
    return (
         <MovieList/>
    );
}

export default MovieListScreen;