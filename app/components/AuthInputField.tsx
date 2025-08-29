import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthInputFieldProps } from '../utils/types';

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  placeholder,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder || label}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AuthInputField;