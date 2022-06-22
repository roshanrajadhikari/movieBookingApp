import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';

import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import SelectList from 'react-native-dropdown-select-list';

const BookMovieScreen = ({ route, navigation }) => {
  /// data structre   [["20", "22/06/2022", "50"], ["10", "23/06/2022", "55"]]
  const movie = route.params.movie;
  const SESSION = {
    usedSeats : 0,
    date: 1,
    capcity:2,
  };

  //getting only the date of session from whole session data
  const getSessions = (item,index)=>{
    return {key:index,value:item[SESSION.date],};
  }
  const sessionData = movie.movieSession.map(getSessions);
  //console.log(movie.movieSession[0][SESSION.capcity]);
  const [loading, setLoading] = useState(false);
  const [selected,setSelectd] = useState("");
  console.log(selected);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onBookPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      console.log(data);
      //console.log(response.attributes);
    } catch (e) {
      console.log(e);
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text>Book Movie Screen {selected}</Text>
        <SelectList data={sessionData} setSelected={setSelectd} boxStyles={{backgroundColor:'white',}} dropdownStyles={{backgroundColor:'white',}} dropdownTextStyles={{color:'black',}} placeholder="Select Movie Session"/>
        <CustomInput
          name="numberSeats"
          placeholder="Number of seats"
          control={control}
          rules={{ required: 'This field is required' }}
        />
        <CustomButton
          text={loading ? 'Loading...' : 'Book'}
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
