import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import apiServices, { loginUser } from '../components/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginUser = async () => {
    const loginCredentials = {
      username: email,
      firstname: '',
      lastname: '',
      password: password,
      confirmpass: '',
    };

    if (!email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return false;

    } else {

      try {
        const response = await apiServices.loginUser(loginCredentials);
        // console.log('login User data:');
        console.log('token', response.data.token)
        // After successful login API call
        Alert.alert('Success', 'User login successfully!')
        await AsyncStorage.setItem('userId', response.data.user._id);
        await AsyncStorage.setItem('token', response.data.token);


        return true;
      } catch (error) {
        console.error('Error posting user data:', error);
        Alert.alert('Error', 'Failed to login . Try again.');
        return false;
      }
    }
  };


  const handleLogin = async () => {
    const isValidAndRegistered = await loginUser();
    if (isValidAndRegistered) {
      router.replace({ // Navigate only if registration succeeded
        pathname: '/tabs/home',

      })
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="zoomIn"
        duration={1500}
        source={require('../assets/images/nearbyroomlogo.png')}
        style={styles.logo}
      />

      <Animatable.Text animation="zoomIn" delay={300} style={styles.title}>
        Login to NearbyRoom
      </Animatable.Text>

      <Animatable.Text animation="zoomIn" delay={600} style={styles.subtitle}>
        Your perfect space is just a few taps away
      </Animatable.Text>


      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />



      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />



      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>



      <TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => router.replace('./signup')}
        >
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6079C5',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#737373',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(113, 130, 198, 0.13)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,

  },
  button: {
    backgroundColor: '#6079C5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#6079C5',
    marginTop: 15,
    fontSize: 14,

  },
  inputContainer: {
    width: 320,

  }
});
