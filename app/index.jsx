import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


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
     

      
        <TouchableOpacity style={styles.button} onPress={() => router.replace('./tabs/home')}>
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
      backgroundColor: '#FFF6AF',
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
      marginBottom :10
    },
    subtitle: {
      fontSize: 16,
      color: '#737373',
      marginBottom: 30,
    },
    input: {
      width: '100%',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      fontSize: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
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
     width : 320,

    }
  });
  