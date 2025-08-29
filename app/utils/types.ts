import { TextInputProps } from "react-native";

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface LoginValues {
  email: string;
  password: string;
}

export interface AuthInputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  style?: object; 
}
