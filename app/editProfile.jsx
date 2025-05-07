import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
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
  const [profilePic, setProfilePic] = useState(profilePictureU || '')
  const [imageUri, setImageUri] = useState('');
  const [cloudinaryImageUrl , setcloudinaryImageUrl] = useState(profilePictureU ||''); 
  const [picUplodedOnDB , setPicUploadedOnDB] = useState(false);


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
        profilePicture : cloudinaryImageUrl 
        
      };

      const response = await apiServices.updateUserData(userId, updatedData, config);
      console.log('Profile updated successfully In Edit:', response.data);
      router.replace('./tabs/profile');
    } catch (error) {
      console.error('Update Failed:', error.response?.data || error.message);
    }
  };

  // Update profile on image change in cloudinary

  useEffect(() => {

    if ( !imageUri ) return;

    const uploadToCloudinary = async () => {
      const data = new FormData();
      data.append("file", {
        uri: imageUri,
        type: "image/jpeg", // use image/png if needed
        name: "profile.jpg",
      });
      data.append("upload_preset", "nearbyrooms"); // your unsigned preset
      data.append("cloud_name", "ddbjyo9wp");       // your cloud name
  
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/ddbjyo9wp/image/upload", {
          method: "POST",
          body: data,
        });
  
        const result = await res.json();
        console.log(" Uploaded image:", result.secure_url);
        setcloudinaryImageUrl(result.secure_url);
        Alert.alert('Success', 'Image uploaded successfully!');
  
      } catch (error) {
        console.error(" Upload error:", error);
        Alert.alert("Upload failed", "Check console for details.");

       
      }
    };

    
    uploadToCloudinary();

  }, [ imageUri ]); // Only trigger when imageUri changes

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
      setProfilePic(selectedImage);
      console.log('New profile pic URI:', selectedImage);
      Alert.alert('Uploading', 'Please wait while the image uploads. A success message will appear once it’s done.');

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
                profilePic
                  ? { uri: profilePic } // if user selected new image
                  // : userData.profilePicture?.startsWith('http') || userData.profilePicture?.startsWith('file:')
                  //   ? { uri: userData.profilePicture } // if profile pic exists from server
                  : require("../assets/images/profile_p.jpg") // fallback default image
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
