/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
 } from 'react-native';
 
 import Navigation from './src/navigation';
 import { Amplify } from 'aws-amplify';
 import config from './src/aws-exports';
 //import {withAuthenticator} from '@aws-amplify/ui-react';

 Amplify.configure(config);
 
 const App = () => {
   return (
     <SafeAreaView style={styles.root}>
     <Navigation/>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   root:{
     flex:1,
   },
 });
 
 export default App;
 