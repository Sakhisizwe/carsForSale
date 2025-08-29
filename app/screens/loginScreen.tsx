import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase';
import AuthInputField from '../components/AuthInputField';
import { LoginValues } from '../utils/types';
import { LoginSchema } from '../utils/validationSchemas';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({email, password}: LoginValues) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/screens/homeScreen');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs26CDWnedi6mIuKLRwzUmYR3QC-iX69r-PlSphYRfmHkqhBF7_-8EgvkujLPFDgOPfMo&usqp=CAU' }}
        style={{ width: 200, height: 200 }}
      />

      <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values: LoginValues) => handleLogin(values)}
      >{({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
        <View style={styles.container}>
          <AuthInputField
            label='Email'
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email && touched.email ? errors.email : undefined}
            placeholder="Enter your email"
          />

          <AuthInputField
            label='Password'
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password && touched.password ? errors.password : undefined}
            placeholder="Enter your password"
            secureTextEntry
          />

          <Button title={loading ? 'Logging in...' : 'Login'} onPress={() =>handleSubmit()} disabled={!isValid || loading} />

          <Text style={{ marginVertical: 10 }}>Don't have an account?</Text>
          <Button title="Signup" onPress={() => router.push('/screens/signUpScreen')} disabled = {loading} />
        </View>
        )}
      </Formik>
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
});
