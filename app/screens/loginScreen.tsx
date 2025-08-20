import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LoginSchema } from '../utils/validationSchemas';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs26CDWnedi6mIuKLRwzUmYR3QC-iX69r-PlSphYRfmHkqhBF7_-8EgvkujLPFDgOPfMo&usqp=CAU' }}
        style={{ width: 200, height: 200 }}
      />

      <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log('You have sign in as : ', values);
      }}
      >{({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting}) => (
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

          <Button title="Login" onPress={() => handleSubmit()} disabled={isSubmitting || !isValid} />

          <Text style={{ marginVertical: 10 }}>Don't have an account?</Text>
          <Button title="Signup" onPress={() => router.push('/screens/signUpScreen')} />
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
    error: { 
    fontSize: 12, 
    color: 'red', 
    marginBottom: 10 
  },
  footer:{
    marginBottom: 2,
    fontWeight: '500',
    alignItems: 'center'
  }
});
