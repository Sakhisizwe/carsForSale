import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
    console.log('Sign up with:', email, password);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create your account</Text>
      </View>

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

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          style={styles.input}
        />

        <Button title="Sign Up" onPress={handleSignUp} />

        <TouchableOpacity onPress={() => router.push('/screens/loginScreen')} style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
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
    width: '100%',
  },
  loginTextContainer: { 
    marginTop: 20, 
    alignItems: 'center',
  },
  loginText: { 
    color: '#1E90FF', 
    textDecorationLine: 'underline',
  },
});
