import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CONSTANTS } from '../../Constants';
import { useAppStyle } from '../../hooks/useAppColors';
import { useAuth } from '../../hooks/useAuth';
import { SignUpFormData, signUpSchema } from '../../utils/validations';

export default function SignUpScreen(): React.JSX.Element {
  const navigation = useNavigation<NavStackType>();
  const { signUp } = useAuth();
  const { styles: globalStyles, colors } = useAppStyle();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data.email, data.password);
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up.');
    }
  };

  const handleSignIn = () => {
    navigation.navigate(CONSTANTS.SCREENS.SIGN_IN);
  };

  return (
    <LinearGradient
      colors={colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={globalStyles.keyboardView}
    >

      <KeyboardAvoidingView
        style={globalStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={globalStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={globalStyles.title}>Create Account</Text>

          {/* Email Input */}
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[globalStyles.input, errors.email && globalStyles.inputError]}
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && (
              <Text style={globalStyles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[globalStyles.input, errors.password && globalStyles.inputError]}
                  placeholder="Create a password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text style={globalStyles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[globalStyles.input, errors.confirmPassword && globalStyles.inputError]}
                  placeholder="Confirm your password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={globalStyles.errorText}>{errors.confirmPassword.message}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[globalStyles.button, isSubmitting && globalStyles.buttonDisabled]}
            onPress={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={globalStyles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={handleSignIn}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpLink}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  signUpText: {
    fontSize: 14,
  },

  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  }
})
