import React, { useState , useEffect} from 'react';
import {Text,View, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiServices from '../components/apiServices';
import Colors from '../components/Colors';

const editProfile = () => {
  const router = useRouter();

  const {
    firstnameU,
    lastnameU,
    usernameU,
    worksAtU,
    livesInU,
    relationshipU,
    countryU,
    profilePictureU,
    phoneNumberU,
    aboutU
  } = useLocalSearchParams();

  const [firstname, setFirstname] = useState(firstnameU || '');
  const [lastname, setLastname] = useState(lastnameU || '');
  const [username, setUsername] = useState(usernameU || '');
  const [worksAt, setWorksAt] = useState(worksAtU || '');
  const [livesIn, setLivesIn] = useState(livesInU || '');
  const [relationship, setRelationship] = useState(relationshipU || '');
  const [country, setCountry] = useState(countryU || '');
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberU||'');
  const [about, setAbout] = useState(aboutU||'');

   useEffect(() => {
        // Send data when component mounts (or based on some trigger)
        console.log('Received from ProfilePicU:', profilePictureU);
  
      }, [profilePictureU]);

  const updateProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedData = {
        username: username,
        password: '123',
        phoneNumber: phoneNumber,
        email: username,
        authMethod: 'local',
        emailVerified: false,
        firstname: firstname,
        lastname: lastname,
        isAdmin: false,
        profilePicture: profilePictureU,
        coverPicture: 'coverpic_url',
        about: about,
        livesIn: livesIn,
        worksAt: worksAt,
        relationship: relationship,
        country: country,
        followers: [],
        following: [],
      };

      const response = await apiServices.updateUserData(userId, updatedData, config);
      console.log('Profile updated successfully:', response.data);
      router.replace('./tabs/profile');
    } catch (error) {
      console.error('Update Failed:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.main}>
        <View style={styles.profileSection}>
    <View style={styles.inputRow}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput style={styles.input} value={firstname} onChangeText={setFirstname} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Last Name:</Text>
      <TextInput style={styles.input} value={lastname} onChangeText={setLastname} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Phone:</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="numeric" />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>About:</Text>
      <TextInput style={styles.input} value={about} onChangeText={setAbout} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Works At:</Text>
      <TextInput style={styles.input} value={worksAt} onChangeText={setWorksAt} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Lives In:</Text>
      <TextInput style={styles.input} value={livesIn} onChangeText={setLivesIn} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Relationship:</Text>
      <TextInput style={styles.input} value={relationship} onChangeText={setRelationship} />
    </View>

    <View style={styles.inputRow}>
      <Text style={styles.label}>Country:</Text>
      <TextInput style={styles.input} value={country} onChangeText={setCountry} />
    </View>
  </View>

  <TouchableOpacity style={styles.saveButton} onPress={updateProfileData}>
    <Text style={styles.saveButtonText}>Save Profile</Text>
  </TouchableOpacity>
    </View>
  );
};




const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profileSection: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  label: {
    width: 100,
    fontSize: 16,
    color: '#333',
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.NearByRoom_logoC, // A nice green color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default editProfile;
