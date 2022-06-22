import * as React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieList from '../../components/MovieList';
import BookMovieScreen from '../BookMovieScreen';

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


function MovieListScreen(){
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}> 
        <Stack.Screen name="movieList" component={MovieList} />
        <Stack.Screen name="bookMovie" component={BookMovieScreen} />
        </Stack.Navigator>
        </NavigationContainer>
         //<BookMovieScreen/>
    );
}

export default MovieListScreen;