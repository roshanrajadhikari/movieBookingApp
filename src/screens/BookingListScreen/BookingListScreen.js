import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import BookingList from '../../components/BookingList';
import { Auth, Hub } from 'aws-amplify';

function BookingListScreen(navigation){

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

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);


  // checkUser().then(response =>{
  //   console.log(response);
  // });

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator/>
      </View>
    );
  }

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please sign in </Text>
      </View>
    );
  }

  return (
      <BookingList/>
    );
}

export default BookingListScreen;