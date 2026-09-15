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
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CONSTANTS } from '../../Constants';
import { useAppStyle } from '../../hooks/useAppColors';
import { useAuth } from '../../hooks/useAuth';
import { LoginFormData, loginSchema } from '../../utils/validations';

export default function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<NavStackType>();
  const { signIn } = useAuth();
  const { styles: globalStyles, colors } = useAppStyle();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during sign in.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate(CONSTANTS.SCREENS.SIGN_UP);
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
          contentContainerStyle={[globalStyles.container, globalStyles.containerGrow]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={globalStyles.title}>Welcome to Quipu App</Text>

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
                  placeholder="Enter your password"
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

          {/* Submit Button */}
          <TouchableOpacity
            style={[globalStyles.button, isSubmitting && globalStyles.buttonDisabled]}
            onPress={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={globalStyles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.textMuted }]}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.7}
            >
              <Text style={[styles.signUpLink, { color: colors.primary }]}>
                Sign Up
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
