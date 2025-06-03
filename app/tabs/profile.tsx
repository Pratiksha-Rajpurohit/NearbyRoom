import { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import Middle from '../../components/profileBottom';
import apiServices from '../../components/apiServices';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Profile() {
  const [userData, setUserData] = useState({})
  const router = useRouter();
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ['41%'];
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [worksAt, setWorksAt] = useState('');
  const [livesIn, setLivesIn] = useState('');
  const [relationship, setRelationship] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [about, setAbout] = useState('');
  const [profilePicture, setProfilePicture] = useState('');





  const handleSnapPress = useCallback((index: number) => {
    setIsOpen(true);
    setTimeout(() => {
      sheetRef.current?.snapToIndex(index);
    }, 0);
  }, []);


  const handleUserDataFromMiddle = (data: any) => {
    // console.log('Received from child:', data);
    setUserData(data);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setCountry(data.country);
    setLivesIn(data.livesIn);
    setWorksAt(data.worksAt)
    setEmail(data.email);
    setRelationship(data.relationship);
    setPhoneNumber(data.phoneNumber);
    setAbout(data.about);
    setProfilePicture(data.profilePicture);

  };


  const handleLogout = async () => {

    const success = await apiServices.logoutUser();
    // console.log("logout", success);
    if (success) {
      router.replace('../login'); // Navigate to login screen
    }

  };


  return (
    <SafeAreaView style={styles.container_s}>
      <ImageBackground
        source={require('../../assets/images/bg_p3.png')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Top Icons */}
            <View style={styles.icon}>

              <TouchableOpacity style={styles.setting} onPress={() => handleSnapPress(0)}>
                <AntDesign name="setting" size={24} color="black" />

              </TouchableOpacity>
            </View>

            {/* Other Content */}
            <Middle sendUserData={handleUserDataFromMiddle} />
          </ScrollView>
        </View>
      </ImageBackground>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}>Setting</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}
            onPressIn={() => {
              if (userData) {
                router.push({
                  pathname: '/editProfile',
                  params: {
                    firstnameU: firstname,
                    lastnameU: lastname || '',
                    emailU: email || '',
                    worksAtU: worksAt || '',
                    livesInU: livesIn || '',
                    relationshipU: relationship || '',
                    countryU: country || '',
                    phoneNumberU: phoneNumber || '',
                    aboutU: about || '',
                    profilePictureU: profilePicture || ''

                  },
                });
              } else {
                console.warn('User data not loaded yet');
              }
            }
            }
          >
            <View style={styles.editAction}>
              <FontAwesome name="edit" size={24} color="rgb(113, 130, 198)" />
              <Text style={styles.actionText}> Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => handleLogout()}>
            <View style={styles.editAction}>
              <MaterialCommunityIcons name="logout" size={25} color="rgb(113, 130, 198)" />
              <Text style={styles.actionText}> Sign Out</Text>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_s: { flex: 1 },
  container: { flex: 1 },
  bgImage: { flex: 1, resizeMode: 'cover' },
  scrollContainer: { paddingBottom: 20 },
  icon: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  setting: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    padding: 20,
  },
  sheetContainer: {
    backgroundColor: 'rgb(113, 130, 198)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  sheetTitle: {

    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',

  },
  editAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,

  },
  actionButton: {

    marginTop: 15
  },
  actionText: {

    color: 'rgb(113, 130, 198)',
    fontSize: 17,
  },
});
