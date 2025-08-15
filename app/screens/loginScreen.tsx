import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs26CDWnedi6mIuKLRwzUmYR3QC-iX69r-PlSphYRfmHkqhBF7_-8EgvkujLPFDgOPfMo&usqp=CAU' }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />

        <Button title="Login" onPress={() => console.log('Login with:', email)} />

        <Text style={{ marginVertical: 10 }}>Don't have an account?</Text>
        <Button title="Signup" onPress={() => router.push('/screens/signUpScreen')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    width: '80%',
  },
  label: {
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
  },
  footer:{
    marginBottom: 2,
    fontWeight: '500',
    alignItems: 'center'
  }
});
