import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthInputFieldProps } from '../utils/types';

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  placeholder,
  style,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = !!secureTextEntry;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder || label}
        secureTextEntry={isPasswordField && !showPassword}
      />

      {isPasswordField && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          />  
        </TouchableOpacity>
      )}
    </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    marginLeft: 10,
  },
  label: {
    marginTop: 12,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AuthInputField;