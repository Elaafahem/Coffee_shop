import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover">

      {/* CONTENU CENTRÉ */}
      <View style={styles.container}>

        <Image
          source={require('../assets/launch_screen.png')}
          style={styles.mainImage}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Coffee so good,{"\n"}your taste buds {"\n"}will love it
          </Text>
          <Text style={styles.subtitle}>
            The best grain, the finest roast, the most powerful flavor.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',   // 👈 centre verticalement
    alignItems: 'center',       // 👈 centre horizontalement
    paddingHorizontal: 24,
  },

  mainImage: {
    width: '80%',
    height: 240,
    marginBottom: 24,
  },

  textContainer: {
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: '#F5F5F5',
    textAlign: 'center',
  },

  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#0A9C4A',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
