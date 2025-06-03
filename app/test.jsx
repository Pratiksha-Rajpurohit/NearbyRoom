import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';



WebBrowser.maybeCompleteAuthSession();



const test = () => {

  // const useProxy = Constants.appOwnership === 'expo';

const redirectUri = AuthSession.makeRedirectUri({
  // native: 'myapp://redirect',
  useProxy: true
});

   console.log("uri" , redirectUri);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '243459918396-am0c6te85nfui1vpficu724jd4hr05b8.apps.googleusercontent.com',
    androidClientId: '243459918396-49tl2soopjopjkk221mbnliqktbng256.apps.googleusercontent.com',
    webClientId: '243459918396-am0c6te85nfui1vpficu724jd4hr05b8.apps.googleusercontent.com',
    redirectUri: "https://auth.expo.io/@rprati/NearbyRoom", //  MUST MATCH GOOGLE CONSOLE
    
  });

  useEffect(() => {
    if (response?.type === 'success') { 
      const { id_token } = response.params;

      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('Firebase login success:', userCredential.user);
          })
          .catch((error) => {
            console.error('Firebase login error:', error);
          });
      } else {
        console.warn('No ID token found in response.');
      }
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20, fontSize: 20 }}>Login</Text>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
};

export default test;
