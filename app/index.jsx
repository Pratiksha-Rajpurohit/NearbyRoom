import { View, Text, ActivityIndicator,Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("token : ",token);
      setTimeout(() => {
        router.replace(token ? '/tabs/home' : '/login');
      }, 1500); // Delay for effect
    };
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Image
      source={require('../assets/images/nearbyroomlogo.png')}  
      style={{ width: 150, height: 150, marginBottom: 20 }}
      resizeMode="contain"
    />
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 }}>
  Welcome to
</Text>
<Text style={{ fontSize: 32, fontWeight: 'bold', color: 'rgb(113, 130, 198)', marginBottom: 15 }}>
  NearbyRooms
</Text>
<Text style={{ fontSize: 16, color: '#7F8C8D', marginBottom: 20 }}>
  Find your perfect place nearby, instantly.
</Text>

    <ActivityIndicator size="large" />
  </View>
  );
}
