import { Text, View , ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfileTop() {
  return (
    
        <View style={styles.icon}>

            <TouchableOpacity style={styles.back}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting}>
                <AntDesign name="setting" size={24} color="black" />
            </TouchableOpacity>
            
        
        </View>
    
    
  );
}

const styles = StyleSheet.create({
    icon: {
        flexDirection : "row",
        justifyContent: "space-between",
        alignItems:"center",

    },

    back: {
        width : 45,
        height: 45,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});