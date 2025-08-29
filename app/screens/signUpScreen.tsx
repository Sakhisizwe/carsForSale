import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';
import AuthInputField from '../components/AuthInputField';
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
            <AuthInputField
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder='Enter email address'
              error={errors.email && touched.email ? errors.email : undefined}
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

            <AuthInputField
              label='Confirm password'
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Confirm your password"
              error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}
              secureTextEntry
            />

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
  loginTextContainer: { 
    marginTop: 20, 
    alignItems: 'center',
  },
  loginText: { 
    color: '#1E90FF', 
    textDecorationLine: 'underline',
  },
});
