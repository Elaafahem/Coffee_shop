import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {useStore} from '../store/store';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = useStore((state: any) => state.user);
  const setUserName = useStore((state: any) => state.setUserName);

  const handleLogin = () => {
    if (!user) {
      setError('No account found. Please register first.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail === user.email &&
      password === user.password
    ) {
      setUserName(user.name);
      setError('');
      navigation.reset({
        index: 0,
        routes: [{name: 'Tab'}],
      });
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue enjoying your favorite coffee.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.secondaryLightGreyHex}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.secondaryLightGreyHex}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.secondaryButtonText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.secondaryButtonText}>Back to welcome</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_30,
  },
  headerContainer: {
    marginTop: SPACING.space_36 * 1.2,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
  },
  subtitle: {
    marginTop: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: SPACING.space_20,
  },
  label: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_8,
  },
  input: {
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_20,
    paddingHorizontal: SPACING.space_16,
    backgroundColor: COLORS.primaryBlackRGBA,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  button: {
    marginTop: SPACING.space_24,
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: '#0A9C4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  secondaryButton: {
    marginTop: SPACING.space_16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  errorText: {
    color: COLORS.primaryRedHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    marginTop: SPACING.space_4,
  },
});

export default LoginScreen;


