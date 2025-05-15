import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import apiServices from '../components/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConformPass] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [users, setUsers] = useState([]);

  const router = useRouter();

  const validateAndSubmit = async () => {
    // Check for empty fields
    if (!email || !firstname || !lastname || !password || !confirmPass) {
      Alert.alert('Error', 'All fields are required!');
      return false;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address!');
      return false;
    }


    // Password length check
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters!');
      return false;
    }

    // Password match check
    if (password !== confirmPass) {
      Alert.alert('Error', 'Passwords do not match!');
      return false;
    }

    // If everything is fine, call registerUser
    const isRegistered = await registerUser();
    return isRegistered;
  };

  const registerUser = async () => {
    const newUser = {
      username: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      confirmpass: confirmPass,
    };

    try {
      const response = await apiServices.postUserData(newUser);
      // console.log('Post User data:', response.data);
      Alert.alert('Success', 'User registered successfully!');
      console.log("tokenR : ", response.data.token);
      await AsyncStorage.setItem('userId', response.data.user._id);
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      console.error('Error posting user data:', error);
      Alert.alert('Error', 'Failed to register user. Try again.');
      return false;
    }
  };

  const handleSignUp = async () => {
    const isValidAndRegistered = await validateAndSubmit();
    if (isValidAndRegistered) {
      router.replace('./tabs/home'); // Navigate only if registration succeeded
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

      <Animatable.Text animation="zoomIn" delay={300} style={styles.title}>Create your account</Animatable.Text>
      <Animatable.Text animation="zoomIn" delay={600} style={styles.subtitle}>Find your perfect room nearby</Animatable.Text>

      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput placeholder="First Name" style={styles.input} value={firstname} onChangeText={setFirstname} />
      <TextInput placeholder="Last Name" style={styles.input} value={lastname} onChangeText={setLastname} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={confirmPass} onChangeText={setConformPass} />


      <TouchableOpacity style={styles.button} onPress={handleSignUp} >
        <Text style={styles.buttonText} >Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link} onPress={() => router.replace('/')}>Already have an account? Log in</Text>
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
});
