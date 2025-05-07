import React from "react";
import Colors from "./Colors";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import apiServices from "./apiServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;


export default function Middle({ sendUserData }) {
  const [id, setId] = useState('');
  const [userData, setUserData] = useState({});
  const [imageUri, setImageUri] = useState('');
  const isFocused = useIsFocused();
  const [cloudinaryImageUrl , setcloudinaryImageUrl] = useState(''); 
  const [picUplodedOnDB , setPicUploadedOnDB] = useState(false);

 

  // Get userId from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setId(userId);
      console.log("User Id PS : ", userId);
    };

    getUserId();


  }, [isFocused]);

  // Fetch user data once the ID is available

  useEffect(() => {
    if (!id ) return;

    const getUserProfileData = async () => {
      try {

        const response = await apiServices.getUserDataById(id);
        setUserData(response.data);
        // Optionally set imageUri if it's not already set
        if (!imageUri && response.data.profilePicture) {
          // setImageUri(response.data.profilePicture);
          console.log("Profile picture loaded from server:", response.data.profilePicture);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to Fetch Profile Data. Try again.');
      }
    };

    getUserProfileData();

    // console.log("imageUri", imageUri)

  }, [id,  isFocused]);


 
  

  useEffect(() => {
    // Send data when component mounts (or based on some trigger)
    sendUserData(userData);
  }, [userData]);

  // Render user profile information
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <TouchableOpacity >
              <Image
                  style={styles.image}
                  source={
                    // cloudinaryImageUrl
                    //   ? { uri: cloudinaryImageUrl }
                    
                       userData.profilePicture
                        ? { uri: userData.profilePicture }
                        : require("../assets/images/profile_p.jpg")
                  }
                />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <Text style={styles.name}>{userData.firstname || "Name"} {userData.lastname || ""}</Text>
            <Text style={styles.username}>{userData.username || "Username"}</Text>
            <Text style={styles.work}>Works at {userData.worksAt || "Nearby Rooms"}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Lives in {userData.livesIn || "Jalna"}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.infoText}>{userData.relationship || "Single"}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.infoText}>{userData.country || "India"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.middleSectionTextContainer}>
          <View style={styles.middleSectionText}>
            <Text style={styles.toptext}>Followers</Text>
            <Text style={styles.bottomtext}>{userData.followers?.length || 0}</Text>
          </View>
          <View style={styles.middleSectionText}>
            <Text style={styles.toptext}>Following</Text>
            <Text style={styles.bottomtext}>{userData.following?.length || 0}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  middleSectionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  middleSectionText: {
    justifyContent: "center",
    alignItems: "center",
  },
  toptext: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
  },
  bottomtext: {
    fontSize: 16,
    color: Colors.white_gray,
    fontWeight: "700",
  },

  container: {
    flex: 1,

  },

  profileSection: {
    alignItems: 'center',
    marginTop: -60,
    paddingHorizontal: 20,
    marginTop: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  work: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  dot: {
    marginHorizontal: 4,
    color: '#999'
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
  },
  followStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  stat: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  }

});