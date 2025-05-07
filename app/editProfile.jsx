import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiServices from '../components/apiServices';
import Colors from '../components/Colors';
import * as ImagePicker from 'expo-image-picker';

const editProfile = () => {
  const router = useRouter();

  const {
    firstnameU,
    lastnameU,
    emailU,
    worksAtU,
    livesInU,
    relationshipU,
    countryU,
    phoneNumberU,
    aboutU,
    profilePictureU
  } = useLocalSearchParams();

  const [firstname, setFirstname] = useState(firstnameU || '');
  const [lastname, setLastname] = useState(lastnameU || '');
  const [email, setEmail] = useState(emailU || '');
  const [worksAt, setWorksAt] = useState(worksAtU || '');
  const [livesIn, setLivesIn] = useState(livesInU || '');
  const [relationship, setRelationship] = useState(relationshipU || '');
  const [country, setCountry] = useState(countryU || '');
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberU || '');
  const [about, setAbout] = useState(aboutU || '');
  const [imageUri, setImageUri] = useState('');


  // useEffect(() => {
  //   console.log("profilepic get");
  //   if (profilePictureU) {
  //     setImageUri(profilePictureU);
  //     console.log("profilepic set")
  //   }
  // }, [profilePictureU]);

  const updateProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("profilepic : ", profilePictureU);
      const updatedData = {

        phoneNumber: phoneNumber,
        email: email,
        firstname: firstname,
        lastname: lastname,
        about: about,
        livesIn: livesIn,
        worksAt: worksAt,
        relationship: relationship,
        country: country,
        
      };

      const response = await apiServices.updateUserData(userId, updatedData, config);
      console.log('Profile updated successfully:', response.data);
      router.replace('./tabs/profile');
    } catch (error) {
      console.error('Update Failed:', error.response?.data || error.message);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      setImageUri(selectedImage);
      console.log('New profile pic URI:', selectedImage);
    }
  };

  return (
    <View style={styles.main}>


      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>

          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.image}
              source={
                imageUri
                  ? { uri: imageUri } // if user selected new image
                  // : userData.profilePicture?.startsWith('http') || userData.profilePicture?.startsWith('file:')
                  //   ? { uri: userData.profilePicture } // if profile pic exists from server
                  : require("../assets/images/profile_pic_bg.jpg") // fallback default image
              }
            />
          </TouchableOpacity>
        </View>


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
    marginTop:30,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderColor: Colors.alt,
    marginBottom: 5,
    backgroundColor: Colors.white,
    borderWidth: 4,
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
