import React from "react";
import * as ImagePicker from 'expo-image-picker';
import Colors from "./Colors";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView,TouchableOpacity } from 'react-native';
import apiServices from "./apiServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect , useState } from "react";


const windowWidth = Dimensions.get('window').width;


export default function Middle() {
  const [id, setId] = useState('');
  const [userData, setUserData] = useState({});
  const [imageUri, setImageUri] = useState('');

  // Get userId from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setId(userId);
      console.log("User Id P : ", userId);
    };

    getUserId();
  }, []);

  // Fetch user data once the ID is available
  useEffect(() => {
    if (!id) return;
    
    const getUserProfileData = async () => {
      try {
        const response = await apiServices.getUserDataById(id);
        setUserData(response.data);
        console.log('Profile User data:', response);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to Fetch Profile Data. Try again.');
      }
    };

    getUserProfileData();
  }, [id , imageUri]);

  // Update profile on image change
  useEffect(() => {

    if (!userData || !imageUri || !id) return;
    

    const updateProfile = async () => {

        try {
             const token = await AsyncStorage.getItem("token"); // Get token asynchronously
  
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    

          const updatedData = {
          
              username: userData.username,
              password: "123",
              phoneNumber: "9876543210",
              email: userData.email,
              authMethod: "local", // or "google"
              emailVerified: false,
              firstname: "abc",
              lastname: "def",
              isAdmin: false,
              profilePicture: imageUri ,
              coverPicture: "coverpic_url",
              about: "I am a software developer.",
              livesIn: "Mumbai",
              worksAt: "Tech Company",
              relationship: "Single",
              country: "India",
              followers: [],
              following: []
        
          };

          apiServices.updateUserData(id, updatedData , config)
            .then(response => {
              console.log("Profile updated successfully", response.data);
            })
            .catch(error => {
              console.error("Error updating profile", error);
            });

        } catch (error) {
            console.error("Update Failed:", error.response ? error.response.data : error.message);
        }
    }

    updateProfile();
    
  }, [userData, imageUri, id]); // Only trigger when imageUri changes

  // Pick image from gallery
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

  // Render user profile information
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.image}
              source={
                imageUri 
                    ? { uri: imageUri } // if user selected new image
                    : userData.profilePicture 
                      ? { uri: userData.profilePicture } // if profile pic exists from server
                      : require("../assets/images/profile_pic_bg.jpg") // fallback default image
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
    color:  Colors.white,
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
      marginTop:3,
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
      color:'#fff',
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