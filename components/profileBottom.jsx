import React from "react";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Colors from "./Colors";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView,TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const user = {
  username: "amantambe",
  firstname: "Aman",
  lastname: "Tambe",
  country: "India",
  livesIn: "jalna",
  worksAt: "nearbyrooms",
  relationship: "single",
  followers: ["6797514a38c8b3a056feb87c", "6797b211fd0018fce47ca72f"],
  following: ["6797514a38c8b3a056feb87c"],
  profilePicture: "../assets/images/profile_pic_bg.jpg",
  coverPicture: "https://yourdomain.com/images/17379821869272acc8a69869094939664891dcf00c2e2.jpg"
};
export default function Middle() {

    const [imageUri, setImageUri] = useState(user.profilePicture);

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
    // Here you can also upload to backend or Firebase
    console.log('New profile pic URI:', selectedImage);
  }
};

  return (
    <ScrollView style={styles.container}>
    <View style={styles.main}>
        
      <View style={styles.imageContainer}>
      <TouchableOpacity onPress={pickImage}>
        
            <Image
            style={styles.image}
            source={
              imageUri === ""
                ? require("../assets/images/profile_pic_bg.jpg")
                : { uri: imageUri }
            }
          />
        
        </TouchableOpacity>


            <View style={styles.profileSection}>
              <Text style={styles.name}>{user.firstname} {user.lastname}</Text>
              <Text style={styles.username}>@{user.username}</Text>
              <Text style={styles.work}>Works at {user.worksAt}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>Lives in {user.livesIn}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.infoText}>{user.relationship}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.infoText}>{user.country}</Text>
              </View>
              {/* <View style={styles.followStats}>
                <Text style={styles.stat}>{user.followers.length} Followers</Text>
                <Text style={styles.stat}>{user.following.length} Following</Text>
              </View> */}
            </View>

            </View>
          

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Follower</Text>
          <Text style={styles.bottomtext}>28</Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Following</Text>
          <Text style={styles.bottomtext}>73</Text>
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