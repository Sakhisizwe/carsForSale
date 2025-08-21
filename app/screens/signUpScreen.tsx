import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';
import { SignUpFormValues } from '../utils/types';
import { SignUpSchema } from '../utils/validationSchemas';

export default function SignUpScreen() {
  const router = useRouter();

const handleSignUp = async (
  values: SignUpFormValues,
  formikHelpers: FormikHelpers<SignUpFormValues>
) => {
  const { setSubmitting } = formikHelpers;

  try {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    Alert.alert('Success', 'Account created successfully!');
    router.push('/screens/loginScreen');
  } catch (error: any) {
    Alert.alert('Error', error.message);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create your account</Text>
      </View>

      <Formik<SignUpFormValues>
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
          <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Confirm your password"
              secureTextEntry
              style={styles.input}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Button title="Sign Up" onPress={() => handleSubmit()} disabled={isSubmitting || !isValid} />

            <TouchableOpacity onPress={() => router.push('/screens/loginScreen')} style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
  error: { 
    fontSize: 12, 
    color: 'red', 
    marginBottom: 10 
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
