import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth } from 'aws-amplify';

const SignInScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
  
    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm();
  
    const onSignInPressed = async data => {
      if (loading) {
        return;
      }
  
      setLoading(true);
      try {
        console.log(data);
        const response = await Auth.signIn(data.username, data.password);
        //console.log(response.attributes);
      } catch (e) {
        console.log(e);
        Alert.alert('Oops', e.message);
      }
      setLoading(false);
    };
  
    const onForgotPasswordPressed = () => {
      navigation.navigate('ForgotPassword');
    };
  
    const onSignUpPress = () => {
      navigation.navigate('SignUp');
    };
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />
  
          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{required: 'Username is required'}}
          />
  
          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password should be minimum 3 characters long',
              },
            }}
          />
  
          <CustomButton
            text={loading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSignInPressed)}
          />
  
          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />
    
          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
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
    logo: {
        resizeMode: 'contain',
        width: '70%',
        maxWidth: 300,
        height: 200,
        marginBottom: 20,
    }
});

export default SignInScreen;
