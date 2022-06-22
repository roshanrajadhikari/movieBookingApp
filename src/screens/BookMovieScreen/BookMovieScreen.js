import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Auth, API } from 'aws-amplify';
import SelectList from 'react-native-dropdown-select-list';
const BookMovieScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(undefined);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(authUser);
      console.log("user signed in");
      return true;
    } catch (e) {
      console.log("user not signed in");
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  /// data structre   [["20", "22/06/2022", "50"], ["10", "23/06/2022", "55"]]
  const movie = route.params.movie;
  const SESSION = {
    usedSeats: 0,
    dateTime: 1,
    capacity: 2,
  };

  //getting only the date of session from whole session data
  const getSessions = (item, index) => {
    return { key: index.toString(), value: item[SESSION.dateTime], };
  }
  const sessionData = movie.movieSession.map(getSessions);
  //console.log(sessionData);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [capacity, setCapacity] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selected != "") {
      console.log(selected);
      setCapacity(movie.movieSession[selected][SESSION.capacity]);
      setAvailableSeats((parseInt(movie.movieSession[selected][SESSION.capacity]) - parseInt(movie.movieSession[selected][SESSION.usedSeats])).toString());
    }
  }, [selected]);

  const onBookPressed = async data => {

    if (loading) {
      return;
    }
    setLoading(true);
    //validation
    if (selected == "") { //empty field handeling
      alert("Please Select a session");
    } else {
      if (user === null) {//user signed in?
        alert("Make sure you've signed in.");
        return;
      }
      const seats = parseInt(data.numberSeats);
      if (seats > parseInt(availableSeats)) {
        alert("Not enough seats available. Please choose a diffrent session");
      }
      try {
        console.log(data);
        //talk to the backend
        const body = {
          bookingId: uuidv4(),
          dateTime: movie.movieSession[selected][SESSION.dateTime],
          movieName: movie.movieName,
          seats: seats,
          user:user.attributes.preferred_username
        };
        /// data structre   [["20", "22/06/2022", "50"], ["10", "23/06/2022", "55"]]

        let updateSession = movie.movieSession;
        updateSession.forEach((item,index)=>{item[0] = (parseInt(item[0]) + parseInt(seats)).toString()});
        const updatedMovie = {
          movieId: movie.movieId,
          movieImage:movie.movieImage,
          movieName:movie.movieName,
          movieRating:movie.movieRating,
          movieSession:updateSession,
        };
        //console.log(updatedMovie);
        API.post('moviesapi', '/bookings/', { body: body })
          .then(res =>
            console.log(res)
          ).finally(()=>{
            API.put('moviesapi','/movies/',{body:updatedMovie})
            .then(res => 
              console.log(res)
              //setBookingLists(res)
              );
            alert("Booked, check your booking list");
            navigation.navigate('movieList',{refresh: true});
          });
        //console.log(response.attributes);
      } catch (e) {
        console.log(e);
        Alert.alert('Oops', e.message);
      }
      setLoading(false);
    }



  };

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={{ fontSize: 20, marginBottom: 10, }}>{movie.movieName}</Text>
        <Text style={{ fontSize: 12, marginBottom: 5, }}>Capacity: {capacity}</Text>
        <Text style={{ fontSize: 12, marginBottom: 5, }}>Available Seats: {availableSeats}</Text>
        <SelectList
          data={sessionData}
          setSelected={setSelected}
          boxStyles={{ backgroundColor: 'white', marginBottom: 10, }}
          dropdownStyles={{ backgroundColor: 'white', }}
          dropdownTextStyles={{ color: 'black', }}
          placeholder="Select Movie Session"
        />
        <CustomInput
          name="numberSeats"
          placeholder="Number of seats"
          control={control}
          rules={{ required: 'This field is required' }}
        />
        <CustomButton
          text={loading ? 'Booking...' : 'Book'}
          onPress={handleSubmit(onBookPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },

});

export default BookMovieScreen;
