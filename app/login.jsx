import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, Button
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import apiServices from '../components/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as AuthSession from 'expo-auth-session';



// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//    expoClientId: "243459918396-jt1bvrrpdmindk0nmv4g1borlqoi7m28.apps.googleusercontent.com",
//   //   iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
//     androidClientId: "243459918396-l0rqlpgs8i2ko9m1jl84jg4m7kqr0591.apps.googleusercontent.com",
//   //   webClientId: "243459918396-jt1bvrrpdmindk0nmv4g1borlqoi7m28.apps.googleusercontent.com",
//   //   redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
//   webClientId: "243459918396-jt1bvrrpdmindk0nmv4g1borlqoi7m28.apps.googleusercontent.com",
// });   

// GoogleSignin.configure({
//   webClientId:
//     "<YOUR_GOOGLE_CLIENT_ID>",
//   scopes: ["profile", "email"],
// });

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  // .......................................................................................


   // .......................................................................................
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
    }

    try {
      const response = await apiServices.loginUser(loginCredentials);
      Alert.alert('Success', 'User login successfully!');
      await AsyncStorage.setItem('userId', response.data.user._id);
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Try again.');
      return false;
    }
  };


  // .......................................................................................

  const handleLogin = async () => {
    const isLoggedIn = await loginUser();
    if (isLoggedIn) {
      router.replace('/tabs/home');
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

      <TouchableOpacity onPress={() => router.replace('./signup')}>
        <Text style={styles.link}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, marginVertical: 20 }}>OR</Text>

       <TouchableOpacity style={styles.button} onPress={() => router.replace("./phoneAuth")}>
        <View style={styles.editAction}>
        <FontAwesome name="phone" size={24} color="white" />
        <Text style={styles.buttonText}>Sign in with Phone</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.replace("./test")}>
        
        <Text style={styles.buttonText}>google signin</Text>
        
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
    marginBottom: 10,
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
  editAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 8,

  },
  link: {
    color: '#6079C5',
    marginTop: 15,
    fontSize: 14,
  },
});
