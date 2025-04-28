import { Text, View , ImageBackground, StyleSheet,ScrollView, TouchableOpacity} from "react-native";
import ProfileTop from "../../components/ProfileTop";
import Middle from "../../components/profileBottom";




const profile = () => {


  
  return (
    
      <ImageBackground source={require("../../assets/images/bg_container.png")} style={styles.bgImage}>
        <View style={styles.container}>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ProfileTop />
            <Middle />
          </ScrollView>
        
        </View>
      </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  bgImage:{
    flex : 1,
    resizeMode: "cover"
  },

  container:{
    marginHorizontal: 20,
    marginTop : 15,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 1,
  }, 

});

export default profile;