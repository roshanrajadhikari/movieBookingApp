import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import BookingList from '../../components/BookingList';
import { Auth, Hub, API } from 'aws-amplify';

function BookingListScreen(navigation){

  const [user, setUser] = useState(undefined);
  const [bookingList, setBookingLists] = useState(undefined);

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

    try {
      API.get('moviesapi','/bookings?q=test2',{body:{user :"test"}})
      .then(res => 
        //console.log(res)
        setBookingLists(res)
        );
    } catch (error) {
      console.log(error)
    }

  }, []);

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
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',}}>Please sign in to see your bookings</Text>
      </View>
    );
  }

  if (user === undefined && bookingList === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
      <BookingList list={bookingList}/>
      
    );
}

export default BookingListScreen;