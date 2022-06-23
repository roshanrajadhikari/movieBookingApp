import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import BookingList from '../../components/BookingList';
import { Auth, Hub, API } from 'aws-amplify';
import CustomButton from '../../components/CustomButton/CustomButton';

function BookingListScreen(navigation) {

  const [user, setUser] = useState(undefined);
  const [bookingList, setBookingLists] = useState(undefined);
  const [reloading, setReloading] = useState(false);

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

  const reload = () => {
    setBookingLists(undefined);
    getBookings();
  }

  const getBookings = () => {
    try {
      const path = "/bookings?q=" + user.attributes.preferred_username;
      API.get('moviesapi', path, {})
        .then(res =>
          //console.log(res)
          setBookingLists(res)
        );
      console.log("here");
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    //console.log(user.attributes.preferred_username);
    if (user != undefined) {
      getBookings();
    }

  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);


  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', }}>Please sign in to see your bookings</Text>
      </View>
    );
  }

  if (user === undefined || bookingList === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center',
      padding: 20,
    }}>
      <CustomButton text="Reload" onPress={reload} type="SECONDARY" />
      <BookingList list={bookingList} />
    </View>
  );
}

export default BookingListScreen;