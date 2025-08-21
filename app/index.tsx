import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/loginScreen';

export default function Index() {

  return (
    <View style={styles.screen}>
      <LoginScreen />
    </View>
  );
}

const styles  = StyleSheet.create ({
  screen: {
    flex:1, 
  }
})
