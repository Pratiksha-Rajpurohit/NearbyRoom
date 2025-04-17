import { Text, TouchableOpacity, View , StyleSheet } from "react-native";
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabBar = ({ state, descriptors, navigation }) => {
    const primaryColor = '#0891b2';
    const greyColor = '#737373';

    const icon = {
      home: (props) => <AntDesign name="home" size={24} {...props} />,
      post: (props) => <Ionicons name="add-circle-outline" size={24} {...props} />,
      chat: (props) => <AntDesign name="wechat" size={24} {...props} />,
      profile: (props) => <MaterialIcons name="account-circle" size={24} {...props} />,
    }

   

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if(['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key= {route.name}
            style = {styles.tabbarItem}
            accessibilityRoll="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            
          >

            {
                icon[route.name]({
                    color : isFocused? primaryColor: greyColor
                })
            }

            <Text style={{ color: isFocused ? primaryColor : greyColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar : {
       
        position : 'absolute',
        bottom : 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius : 25,
        borderCurve : 'continuous',
        shadowColor : 'black',
        shadowOffset : {width: 0 , height: 10},
        shadowRadius : 10,
        shadowOpacity : 0.1,


    },

    tabbarItem:{

        flex : 1,
        justifyContent:'center',
        alignItems : 'center',
        gap:2

    }

   

})

export default TabBar