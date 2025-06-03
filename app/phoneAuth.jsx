import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase'; 
import { 
  PhoneAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default function PhoneAuthScreen() {
  const router = useRouter();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const sendVerification = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(id);
      setMessage('Verification code has been sent.');
      
    } catch (err) {
      setMessage(`Error sending code: ${err.message}`);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      setMessage('Phone authentication successful!');
      router.replace("./tabs/home");
    } catch (err) {
      setMessage(`Error verifying code: ${err.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />

      <TextInput
        placeholder="+91 76206442227"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />
      <Button title="Send Verification Code" onPress={sendVerification} />

      <TextInput
        placeholder="Verification code"
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />
      <Button title="Confirm Verification Code" onPress={confirmCode} />

      {message ? <Text style={{ marginTop: 10 }}>{message}</Text> : null}
    </View>
  );
}
