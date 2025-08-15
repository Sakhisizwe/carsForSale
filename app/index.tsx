import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Welcome!</Text>
      <Button title="Go to Login" onPress={() => router.push('/screens/loginScreen')} />
    </View>
  );
}
