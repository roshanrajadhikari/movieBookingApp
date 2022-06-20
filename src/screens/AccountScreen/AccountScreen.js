import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Icon,
  ActivityIndicator
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import ConfirmEmailScreen from "../ConfirmEmailScreen";
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import NewPasswordScreen from '../NewPasswordScreen';
import HomeScreen from '../HomeScreen';
import { Auth, Hub } from 'aws-amplify';

const Stack = createNativeStackNavigator();

function AccountScreen({ navigation }) {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(authUser);
    } catch (e) {
      setUser(null);
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

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default AccountScreen;