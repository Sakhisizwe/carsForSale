import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase';

export default function HomeScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/screens/loginScreen');
    } catch (error: any) {
      Alert.alert('Sign Out Failed', error.message || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}> Welcome Back! </Text>
        <Text style={styles.subText}>Available car deals for you!.</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.footer}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingBottom: 60
  },
});
